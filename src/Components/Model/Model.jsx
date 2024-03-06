import PropTypes from 'prop-types';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';

import { setPosition } from '../../store/reducers/stateCamera';

Model.propTypes = {
    setModelRef: PropTypes.func
}

export default function Model({ setModelRef, markerPosition }) {
    const { nodes, materials } = useGLTF('/model/test/ofice.gltf')
    const dispatch = useDispatch();
    const modelRef = useRef();
    const cameraState = useSelector((state) => state.stateCamera);
    const [animPosition, setAnimPosition] = useState({
        x: 1,
        y: 1.286,
        z: 0
    })

    useEffect(() => {
        modelRef && setModelRef(modelRef)
    }, [setModelRef])

    useEffect(() => {
        gsap.to(animPosition, {
            x: cameraState.position[0],
            z: cameraState.position[2],
            duration: .3,
            onUpdate: () => {
                setAnimPosition({
                    x: animPosition.x,
                    y: animPosition.y,
                    z: animPosition.z
                });
            }
        })
    }, [cameraState.position, animPosition])

    const handleClick = () => {
        dispatch(setPosition([markerPosition[0], cameraState.position[1], markerPosition[2]]))
    };

    return (
        <group ref={modelRef}>
            <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={58.716} position={[-1.223, 1.321, -2.003]} rotation={[-2.556, -1.118, -2.604]} />
            <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={58.716} position={[-2.823, 1.286, -1.791]} rotation={[-3.037, -1.437, -3.038]} />
            <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={58.716} position={[-2.533, 1.321, 0.232]} rotation={[-2.778, 0.049, 3.123]} />
            <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={58.716} position={[2.206, 1.32, -2.276]} rotation={[-2.401, 0.044, 3.101]} />
            <mesh geometry={nodes.Plane4.geometry} material={materials['My_UV-texture_UVMAT']} onDoubleClick={handleClick} />
            <OrbitControls makeDefault position={[animPosition.x, animPosition.y, animPosition.z]} target={[animPosition.x, animPosition.y, animPosition.z]} far={1000} near={0.1} fov={58.716} maxDistance={0.1} minDistance={-1} />
        </group>
    )
}

useGLTF.preload('/model/test/ofice.gltf') 