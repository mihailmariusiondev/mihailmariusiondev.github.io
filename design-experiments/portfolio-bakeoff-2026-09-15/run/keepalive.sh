#!/usr/bin/env bash
# Keeps every built concept previewed on 0.0.0.0:44NN (task-owned; stop: kill $(cat run/keepalive.pid)).
cd /tmp/portfolio-design-bakeoff-20260914
while true; do
  ss -ltnH 'sport = :4400' | grep -q . || setsid nohup python3 -m http.server 4400 --bind 0.0.0.0 --directory gallery >run/gallery.log 2>&1 &
  for d in c[0-9]*-*/; do
    d=${d%/}; n=${d%%-*}; p=$((4400+${n#c}))
    [ -f "$d/dist/index.html" ] || continue
    ss -ltnH "sport = :$p" | grep -q . && continue
    (cd "$d" && setsid nohup ./node_modules/.bin/astro preview --host 0.0.0.0 --port $p >>../run/$d.log 2>&1 & echo $! >../run/$d.pid)
    echo "$(date +%T) restarted $d on $p" >>run/keepalive.log
  done
  for d in v2/s[0-9]*-*/; do
    [ -d "$d" ] || continue
    d=${d%/}; b=${d#v2/}; n=${b%%-*}; n=${n#s}; p=$((4420+10#$n))
    [ -f "$d/dist/index.html" ] || continue
    ss -ltnH "sport = :$p" | grep -q . && continue
    setsid nohup python3 -m http.server $p --bind 0.0.0.0 --directory "$d/dist" >>run/v2-$b.log 2>&1 &
    echo "$(date +%T) started v2 $b on $p" >>run/keepalive.log
  done
  sleep 15
done
