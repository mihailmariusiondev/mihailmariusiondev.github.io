// Minimal hand-written WebGL CRT post-process: scanlines, vignette, phosphor
// flicker and grain, layered as a transparent overlay above the DOM terminal.
// No three.js/ogl: one full-screen triangle, one fragment shader.
(function () {
  "use strict";

  var canvas = document.getElementById("glcanvas");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var gl = canvas.getContext("webgl", { alpha: true, antialias: false }) ||
    canvas.getContext("experimental-webgl", { alpha: true, antialias: false });

  if (!gl) {
    // No WebGL: CSS ::before scanline/vignette already covers the look.
    canvas.style.display = "none";
    return;
  }

  var vertSrc = [
    "attribute vec2 aPos;",
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = aPos * 0.5 + 0.5;",
    "  gl_Position = vec4(aPos, 0.0, 1.0);",
    "}",
  ].join("\n");

  var fragSrc = [
    "precision mediump float;",
    "varying vec2 vUv;",
    "uniform float uTime;",
    "uniform vec2 uResolution;",
    "uniform float uFlicker;", // 0 = off (reduced motion), 1 = on

    "float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }",

    "void main() {",
    "  vec2 uv = vUv;",
    "  vec2 c = uv - 0.5;",
    "  float vig = 1.0 - smoothstep(0.35, 0.75, length(c));",
    "  float scan = sin((uv.y * uResolution.y) * 3.14159) * 0.5 + 0.5;",
    "  scan = pow(scan, 3.0);",
    "  float grain = (rand(uv * uResolution.xy + uTime * (uFlicker > 0.5 ? 60.0 : 0.0)) - 0.5) * 0.035;",
    "  float flick = 1.0;",
    "  if (uFlicker > 0.5) {",
    "    flick = 0.94 + 0.06 * sin(uTime * 18.0) + 0.02 * sin(uTime * 53.0 + 1.0);",
    "  }",
    "  float darken = (1.0 - vig) * 0.55 + scan * 0.10;",
    "  float alpha = clamp(darken - grain * 0.4, 0.0, 0.85);",
    "  vec3 col = vec3(0.0);",
    "  gl_FragColor = vec4(col, alpha) * flick;",
    "  gl_FragColor.a = clamp(gl_FragColor.a + (1.0 - flick) * 0.3, 0.0, 0.9);",
    "}",
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("shader compile error", gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, vertSrc);
  var fs = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) { canvas.style.display = "none"; return; }

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("program link error", gl.getProgramInfoLog(prog));
    canvas.style.display = "none";
    return;
  }
  gl.useProgram(prog);

  var quad = new Float32Array([-1, -1, 3, -1, -1, 3]);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uTime = gl.getUniformLocation(prog, "uTime");
  var uResolution = gl.getUniformLocation(prog, "uResolution");
  var uFlicker = gl.getUniformLocation(prog, "uFlicker");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth * dpr;
    var h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  var raf = null;
  function frame(t) {
    resize();
    gl.uniform1f(uTime, t * 0.001);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uFlicker, reduceMotion ? 0.0 : 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  raf = requestAnimationFrame(frame);

  window.__crtShader = {
    setReducedMotion: function (v) { reduceMotion = v; },
  };
})();
