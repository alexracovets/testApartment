import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

function Cubes() {
    const meshRef = useRef();
    const [instanceCount, setInstanceCount] = useState(0);

    new GLTFLoader().load('/model/car2.glb', (gltf) => {
        const matrices = [];

        const processNode = (node, parentMatrix = new THREE.Matrix4()) => {
            const localMatrix = new THREE.Matrix4().compose(
                node.position,
                node.quaternion,
                node.scale
            );
            const globalMatrix = parentMatrix.clone().multiply(localMatrix);
            if (node.geometry && node.geometry.attributes.position) {
                const positionArray = node.geometry.attributes.position.array;
                for (let i = 0; i < positionArray.length; i += 6) {
                    const position = new THREE.Vector3().fromArray(positionArray, i);
                    position.applyMatrix4(globalMatrix);
                    const matrix = new THREE.Matrix4().setPosition(position);
                    matrices.push(matrix);
                }
            }
            node.children.forEach(child => processNode(child, globalMatrix));
        };

        gltf.scene.children.forEach(child => processNode(child));

        if (meshRef.current) {
            matrices.forEach((matrix, i) => {
                meshRef.current.setMatrixAt(i, matrix);
                meshRef.current.instanceMatrix.needsUpdate = true;
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
        console.log(matrices.length)
        setInstanceCount(matrices.length);
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, instanceCount]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshNormalMaterial />
        </instancedMesh>

    );
}

function StartGenerate() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <pointLight position={[10, 10, 10]} />
            <Cubes />
        </Canvas>
    );
}

export default StartGenerate;
