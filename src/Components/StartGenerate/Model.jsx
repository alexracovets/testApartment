import { useGLTF } from '@react-three/drei'
import { useContext, useEffect } from 'react';
import * as THREE from 'three'
// Створення контексту
import { ModelBoundsContext } from './Context';

export default function Model(props) {
    const { nodes, materials } = useGLTF('/model/car2.glb')
    const { setBounds } = useContext(ModelBoundsContext);

    useEffect(() => {
        const model = new THREE.Group();
        Object.values(nodes).forEach(node => {
            if (node.geometry) {
                const mesh = new THREE.Mesh(node.geometry);
                model.add(mesh);
            }
        });
        const box = new THREE.Box3().setFromObject(model);
        setBounds(box);
    }, [nodes, setBounds]);

    return (
        <group {...props} dispose={null}>
            {/* <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} /> */}
            <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} />
        </group>
    )
}

useGLTF.preload('/model/car2.glb')
