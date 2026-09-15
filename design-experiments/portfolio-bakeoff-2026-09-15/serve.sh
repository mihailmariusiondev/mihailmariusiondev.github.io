#!/usr/bin/env bash
# Serve the gallery (4400) and every built concept (44NN) on 0.0.0.0, detached.
# ponytail: one `astro preview` per concept; logs/pids in ./run/. Stop with ./serve.sh stop
set -u
cd "$(dirname "$0")"
mkdir -p run
if [ "${1:-}" = stop ]; then
  for f in run/*.pid; do [ -f "$f" ] && kill "$(cat "$f")" 2>/dev/null; rm -f "$f"; done
  exit 0
fi
IP=$(ip -4 -o addr show eth1 | awk '{print $4}' | cut -d/ -f1)
setsid nohup python3 -m http.server 4400 --bind 0.0.0.0 --directory gallery >run/gallery.log 2>&1 &
echo $! >run/gallery.pid
for d in c*/; do
  d=${d%/}; n=${d%%-*}; n=${n#c}; port=$((4400 + n))
  [ -d "$d/dist" ] || { echo "skip $d (no dist)"; continue; }
  (cd "$d" && setsid nohup npx astro preview --host 0.0.0.0 --port "$port" >"../run/$d.log" 2>&1 & echo $! >"../run/$d.pid")
  echo "$d  http://$IP:$port/"
done
echo "gallery  http://$IP:4400/"
