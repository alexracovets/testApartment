import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

export default function Panoramas() {
    const texture = useLoader(THREE.TextureLoader, 'panoramas/1.jpg');
    const { camera } = useThree()
    return (
        <Sphere args={[500, 64, 64]} position={camera.position} scale={[-1, 1, 1]} rotation={[0, Math.PI / 1.2, 0]}>
            <meshStandardMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
    );
}
