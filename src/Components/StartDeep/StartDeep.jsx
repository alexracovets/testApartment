import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Model from "../Model/Model";
import InteractiveMesh from "../InteractiveMesh/InteractiveMesh";

export default function StartDeep() {
    const [modelRef, setModelRef] = useState(null);
    const [markerPosition, setMarkaerPosition] = useState(null);

    return (
        <Canvas
            dpr={window.devicePixelRatio}
            gl={{ preserveDrawingBuffer: true }}
            camera={{ fov: 90, near: 0.1, far: 1000 }}
        >
            {modelRef && <InteractiveMesh intersect={modelRef.current.children} getMarkaerPosition={setMarkaerPosition} />}
            <Model setModelRef={setModelRef} markerPosition={markerPosition} />
        </Canvas>
    );
}
