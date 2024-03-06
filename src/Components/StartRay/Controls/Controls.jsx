import { OrbitControls } from "@react-three/drei";
import { useThree } from '@react-three/fiber';
// import { useSelector } from "react-redux";
import { gsap } from 'gsap';
import { useEffect } from "react";
import { useControls } from "leva";

export default function Controls() {
    const { camera, gl: { domElement } } = useThree();
    // const cameraParameter = useSelector((state) => state.stateCamera);
    const positionTest = useControls({
        positionX: 0,
        positionY: 100,
        positionZ: 0
    })

    const animationCamera = (cameraPosition, camera) => {
        console.log(cameraPosition)
        console.log(camera)
        gsap.to(camera.position, {
            duration: 1,
            x: cameraPosition[0],
            y: cameraPosition[1],
            z: cameraPosition[2],
            ease: "expoScale(0.5,7,none)"
        });
    }

    useEffect(() => {
        animationCamera([positionTest.positionX, positionTest.positionY, positionTest.positionZ], camera)
    }, [positionTest, camera])

    return (
        <OrbitControls
            maxDistance={0.1}
            args={[camera, domElement]}
        />
    )
}