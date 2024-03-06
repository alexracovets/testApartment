import { useRef } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import { TextureLoader, DoubleSide, Vector2 } from 'three';
import { shaderMaterial } from '@react-three/drei';

// Визначення кастомного шейдер матеріалу
const CustomShaderMaterial = shaderMaterial(
  {
    colorTexture: { value: null },
    depthTexture: { value: null },
    resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
  },
  // Vertex Shader
  `varying vec2 vUv;
  uniform sampler2D depthTexture;
  uniform vec2 resolution;
  void main() {
    vUv = uv;
    float depth = texture2D(depthTexture, vUv).r;
    vec3 displacedPosition = position + normal * depth * 20.0; // 10.0 - інтенсивність впливу глибини
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }`,
  // Fragment Shader
  `uniform sampler2D colorTexture;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(colorTexture, vUv);
    gl_FragColor = color;
  }`
);

extend({ CustomShaderMaterial });

export default function Panorama() {
  const colorTexture = useLoader(TextureLoader, 'panorama/1/panorama.jpg');
  const depthTexture = useLoader(TextureLoader, 'panorama/1/depth.png');
  const meshRef = useRef();

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <customShaderMaterial
        colorTexture={colorTexture}
        depthTexture={depthTexture}
        side={DoubleSide}
      />
    </mesh>
  );
}
