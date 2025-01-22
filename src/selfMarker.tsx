import {Billboard, Entity, useGlobeContext, Vector} from "@openglobus/openglobus-react";
import React, {useEffect} from "react";
import {LonLat} from "@openglobus/og/lib/js/LonLat";
import {useRuler} from "./ruler";

export const SelfMarker = React.memo(() => {
    const actualGPS  = new LonLat(14.43619, 50.07526);
    useRuler();
    const { globe } = useGlobeContext();

        useEffect(() => {
        if (globe) {
            globe.planet.camera.flyLonLat(new LonLat(actualGPS.lon, actualGPS.lat, 100000));

        }
    }, [globe]);


    return (
   <Vector name={'selfMarker'}>
       <Entity
           key={'selfMarkEntityKey'}
           geometry={{ type: 'POINT', coordinates: [actualGPS.lon, actualGPS.lat, 215] }}
           lon={actualGPS.lon}
           lat={actualGPS.lat}
           alt={25}
           properties={{ color: '#9d2626' }}
       >
           <Billboard key={'selfBillboardKey'} size={[30, 30]} src={'/point.svg'} color={'#9d2626'} />
       </Entity>
   </Vector>
    );
});