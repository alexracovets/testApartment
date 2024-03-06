import * as THREE from 'three';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';

CircleMarker.propTypes = {
    position: PropTypes.array,
    normal: PropTypes.array
}

export default function CircleMarker({ position, normal }) {
    const { camera } = useThree();

    const finalPosition = useMemo(() => {
        const markerPosition = new THREE.Vector3(...position);
        const cameraPosition = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
        const directionToCamera = markerPosition.clone().sub(cameraPosition).normalize();
        return markerPosition.add(directionToCamera.multiplyScalar(-0.1)).toArray();
    }, [position, camera]);

    const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3().fromArray(normal)
    ), [normal]);

    return (
        <mesh position={finalPosition} quaternion={quaternion}>
            <circleGeometry args={[0.05, 32]} />
            <meshBasicMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
    );
}

