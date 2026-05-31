import React, { useEffect, useRef } from 'react';
import { AFScene3D } from '../lib/scene3d';

// Scene3D — React wrapper around the vanilla AFScene3D controller.

function Scene3D({ shape = 'knot', accent, accent2, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !AFScene3D) return;
    const ctrl = AFScene3D(ref.current, { shape, accent, accent2 });
    return () => ctrl.destroy();
  }, [shape, accent, accent2]);
  return <div ref={ref} className={className} style={{ width: '100%', height: '100%', ...style }} />;
}

export default Scene3D;
