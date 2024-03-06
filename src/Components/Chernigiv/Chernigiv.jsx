import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

Chernigiv.propTypes = {
    setModelRef: PropTypes.func
}

export function Chernigiv({ setModelRef }) {
    const { nodes } = useGLTF('/model/chernigiv.glb');
    const modelRef = useRef();

    useEffect(() => {
        modelRef && setModelRef(modelRef)
    }, [setModelRef])

    return (
        <group ref={modelRef} position={[5, 0, 54]} rotation={[-0.04, -0.05, -0.02]} scale={[2.3, 2.3, 2.3]} 
        // visible={false}
        >
            <mesh geometry={nodes['84077d66434745a48ba9220ddae856b8'].geometry} material={nodes['84077d66434745a48ba9220ddae856b8'].material} />
        </group>
    )
}

useGLTF.preload('/model/chernigiv.glb')
