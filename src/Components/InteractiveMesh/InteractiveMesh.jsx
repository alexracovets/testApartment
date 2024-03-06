import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useFrame, useThree } from "@react-three/fiber";

import CircleMarker from "../CircleMarker/CircleMarker";

InteractiveMesh.propTypes = {
  intersect: PropTypes.array,
  getMarkaerPosition: PropTypes.func
}

export default function InteractiveMesh({ intersect, getMarkaerPosition }) {
  const { raycaster, mouse, camera } = useThree();
  const [markerPosition, setMarkerPosition] = useState(null);

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(intersect, true);
    intersects.length > 0
      ? setMarkerPosition({ position: intersects[0].point.toArray(), normal: intersects[0].face.normal.toArray() })
      : setMarkerPosition(null)
  });

  useEffect(() => {
    markerPosition && getMarkaerPosition(markerPosition.position)
  }, [markerPosition, getMarkaerPosition])

  return <>
    {markerPosition && <CircleMarker position={markerPosition.position} normal={markerPosition.normal} />}
  </>
}
