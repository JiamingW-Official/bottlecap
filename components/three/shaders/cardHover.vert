varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  vec3 pos = position;

  float dist = distance(vUv, uMouse);
  float wave = sin(dist * 10.0 - uTime * 3.0) * 0.02;
  float falloff = smoothstep(0.5, 0.0, dist);

  pos.z += wave * falloff;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
