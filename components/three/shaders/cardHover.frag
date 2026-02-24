varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  float dist = distance(vUv, uMouse);
  float ripple = sin(dist * 10.0 - uTime * 3.0) * 0.5 + 0.5;
  float falloff = smoothstep(0.5, 0.0, dist);

  vec3 baseColor = vec3(1.0, 0.42, 0.21); // #FF6B35
  vec3 bgColor = vec3(1.0, 0.94, 0.92);   // light orange

  vec3 color = mix(bgColor, baseColor, ripple * falloff * 0.15);

  gl_FragColor = vec4(color, 1.0);
}
