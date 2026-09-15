import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Compact 3D simplex noise (Ashima Arts, public domain-style MIT license snippet)
// used to distort the core geometry in the vertex shader.
const NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const CORE_VERTEX = `
${NOISE_GLSL}
uniform float uTime;
uniform float uDistortion;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
  vNormal = normal;
  float n = snoise(position * 1.6 + uTime * 0.18);
  vec3 displaced = position + normal * n * uDistortion;
  vPos = displaced;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const CORE_FRAGMENT = `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
  vec3 viewDir = normalize(cameraPosition - vPos);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);
  vec3 glow = uColor * (0.25 + fresnel * 1.6);
  gl_FragColor = vec4(glow, 0.85);
}
`;

export interface ChapterDef {
  id: string;
  color: number;
}

const CHAPTERS: ChapterDef[] = [
  { id: "hero", color: 0x6df3ff },
  { id: "work", color: 0xffb85c },
  { id: "timeline", color: 0x8ef3a0 },
  { id: "signals", color: 0xff6d9c },
  { id: "about", color: 0x9d8cff },
  { id: "contact", color: 0x6df3ff },
];

const SPACING = 15;

export class World {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private cores: THREE.Mesh[] = [];
  private ringGroup: THREE.Group;
  private particles!: THREE.Points;
  private clock = new THREE.Clock();
  private progress = 0;
  private targetProgress = 0;
  private mobile: boolean;
  private raf = 0;
  private mouse = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement, mobile: boolean) {
    this.mobile = mobile;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !mobile,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x05060a, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(0, 0, 6);

    this.scene.fog = new THREE.FogExp2(0x05060a, 0.028);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(ambient);
    const point = new THREE.PointLight(0x6df3ff, 2.2, 40);
    point.position.set(2, 3, 4);
    this.scene.add(point);

    this.buildCores();
    this.ringGroup = this.buildTimelineRing();
    this.buildParticles();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    if (!mobile) {
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.85,
        0.6,
        0.15
      );
      this.composer.addPass(bloom);
    }

    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
  }

  private buildCores() {
    const geo = new THREE.IcosahedronGeometry(1.6, mobileDetail(this.mobile));
    CHAPTERS.forEach((chap, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: CORE_VERTEX,
        fragmentShader: CORE_FRAGMENT,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uDistortion: { value: i === 1 ? 0.35 : 0.18 },
          uColor: { value: new THREE.Color(chap.color) },
        },
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(Math.sin(i * 1.3) * 1.4, Math.cos(i * 0.9) * 0.6, -i * SPACING);
      this.scene.add(mesh);
      this.cores.push(mesh);

      const wire = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: chap.color, wireframe: true, transparent: true, opacity: 0.15 })
      );
      wire.position.copy(mesh.position);
      wire.scale.setScalar(1.03);
      this.scene.add(wire);
    });
  }

  private buildTimelineRing(): THREE.Group {
    const group = new THREE.Group();
    const timelineZ = -2 * SPACING;
    const count = 9;
    const nodeGeo = new THREE.SphereGeometry(0.16, 12, 12);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.4;
      const mat = new THREE.MeshBasicMaterial({ color: 0x8ef3a0 });
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, timelineZ);
      group.add(node);
    }
    this.scene.add(group);
    return group;
  }

  private buildParticles() {
    const count = this.mobile ? 700 : 2400;
    const positions = new Float32Array(count * 3);
    const depth = SPACING * (CHAPTERS.length + 1);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = -Math.random() * depth + 8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x6df3ff,
      size: this.mobile ? 0.05 : 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  setProgress(p: number) {
    this.targetProgress = Math.min(Math.max(p, 0), 1);
  }

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  };

  private onPointerMove = (e: PointerEvent) => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  start() {
    const tick = () => {
      this.raf = requestAnimationFrame(tick);
      const t = this.clock.getElapsedTime();

      this.progress += (this.targetProgress - this.progress) * 0.08;

      const totalDepth = (CHAPTERS.length - 1) * SPACING;
      const camZ = 6 - this.progress * totalDepth;
      const curveX = Math.sin(this.progress * Math.PI * 3) * 1.1;
      const curveY = Math.cos(this.progress * Math.PI * 2.2) * 0.6;
      this.camera.position.z = camZ;
      this.camera.position.x += (curveX + this.mouse.x * 0.6 - this.camera.position.x) * 0.05;
      this.camera.position.y += (curveY - this.mouse.y * 0.4 - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.camera.position.x * 0.6, this.camera.position.y * 0.6, camZ - 10);

      this.cores.forEach((mesh) => {
        mesh.rotation.y = t * 0.15;
        mesh.rotation.x = t * 0.08;
        (mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      });

      this.ringGroup.rotation.z = t * 0.06;
      this.ringGroup.children.forEach((node: THREE.Object3D, i: number) => {
        node.position.z = -2 * SPACING + Math.sin(t * 0.5 + i) * 0.15;
      });

      this.particles.rotation.y = t * 0.01;

      this.composer.render();
    };
    tick();
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    this.renderer.dispose();
  }
}

function mobileDetail(mobile: boolean) {
  return mobile ? 1 : 2;
}

export function chapterCount() {
  return CHAPTERS.length;
}
