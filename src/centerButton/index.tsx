import React, { useCallback } from 'react';
import { useGlobeContext } from '@openglobus/openglobus-react';
import {LonLat} from "@openglobus/og/lib/js/LonLat";


export const CenterButton: React.FC = React.memo(() => {
  const { globe } = useGlobeContext();
    const startPoint = new LonLat(14.43619, 50.07526);


    const handleClick = useCallback(() => {
    if (globe?.planet) {
      globe.planet.camera.flyLonLat(new LonLat(startPoint.lon, startPoint.lat));
    }
  }, [globe, startPoint]);

  return (
    <div style={{zIndex: 10, background: 'black',width: 40, height: 40, cursor: 'pointer', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}  onClick={handleClick}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 14C20 17.3137 17.3137 20 14 20C10.6863 20 8.00001 17.3137 8.00001 14C8.00001 10.6863 10.6863 8 14 8C17.3137 8 20 10.6863 20 14Z"
          fill="#FFFFFF"
        />
        <circle cx="14" cy="14" r="9.5" stroke="#FFFFFF" />
        <line x1="23" y1="14" x2="28" y2="14" stroke="#FFFFFF" stroke-width="2" />
        <path d="M14 5V0" stroke="#FFFFFF" stroke-width="2" />
        <line x1="5" y1="14" y2="14" stroke="#FFFFFF" stroke-width="2" />
        <line x1="14" y1="23" x2="14" y2="28" stroke="#FFFFFF" stroke-width="2" />
      </svg>
    </div>
  );
});
