import { useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// import Model from "../Model/Model";
import InteractiveMesh from "../InteractiveMesh/InteractiveMesh";
import { Chernigiv } from "../Chernigiv/Chernigiv";
// import Controls from "./Controls/Controls";
import CameraAnimator from "./CameraAnimation/CameraAnimation";
import Panoramas from "./Panoramas/Panoramas";
import { Capsule } from "@react-three/drei";

export default function StartRay() {
    const [modelRef, setModelRef] = useState(null);

    return (
        <Canvas
            dpr={window.devicePixelRatio}
            gl={{ preserveDrawingBuffer: true }}
            camera={{ fov: 90, near: 0.1, far: 1000 }}
        >
            <ambientLight intensity={2} />
            {/* <OrbitControls /> */}
            {modelRef && <InteractiveMesh intersect={modelRef.current.children} />}
            <Chernigiv setModelRef={setModelRef} />
            <Panoramas />
            <CameraAnimator />
            <Capsule args={[0.5, 1, 10]} position={[-2, 0, -51]} />
        </Canvas>
    );
}
