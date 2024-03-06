import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useEffect } from "react";

export default function CameraAnimator() {
    const { camera } = useThree();
    const position = useControls([-12, 3, -46]);

    useEffect(() => {
        gsap.to(camera.position, {
            x: position[0],
            y: position[1],
            z: position[2],
            duration: 1,
            ease: "power3.inOut",
            onUpdate: () => camera.updateProjectionMatrix()
        });
    }, [position, camera]);
    console.log(camera.position)
    return <PointerLockControls />;
}
