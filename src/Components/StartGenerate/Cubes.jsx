import { useContext, useMemo } from "react";
import { ModelBoundsContext } from "./Context";

export default function Cubes() {
    const { bounds } = useContext(ModelBoundsContext); 
    const Cube = ({ position, size }) => (
        <mesh position={position} >
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial />
        </mesh >
    );

    const cubes = useMemo(() => {
        // Перевірка, чи існує bounds і bounds.center
        if (!bounds || !bounds.center) return null;

        const items = [];
        for (let i = 0; i < 200; i++) {
            const size = Math.random() * 0.05 + 0.05; // Розмір від 0.1 до 0.3
            const position = [
                bounds.center.x + (Math.random() - 0.5) * bounds.size.x,
                bounds.center.y + (Math.random() - 0.5) * bounds.size.y,
                bounds.center.z + (Math.random() - 0.5) * bounds.size.z,
            ];
            items.push(<Cube key={i} position={position} size={size} />);
        }
        return items;
    }, [bounds]); // Залежить від границь моделі

    return <>{cubes}</>;
}
