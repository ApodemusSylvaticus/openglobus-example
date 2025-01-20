import React, {useEffect, useState} from "react";
import {useGlobeContext, Vector} from "@openglobus/openglobus-react";
import {FOVComponent} from "./fovComponent.tsx";
import {LonLat} from "@openglobus/og/lib/js/LonLat";

export const FovManipulation: React.FC = () => {
    const {globe} = useGlobeContext();
    const startPoint = new LonLat(14.43619, 50.07526);


    const [azimuth, setAzimuth] = useState<number>(0)

    useEffect(() => {
       const interval = setInterval(() => setAzimuth(prev => prev + 10), 1000)
        return () => clearInterval(interval)
    }, []);

    if(globe === null){
        return
    }


    return <Vector name={'FOV'}>
        <FOVComponent color={'#454545'} distance={25000}  startPoint={startPoint} componentKey={'yellow-fov'} azimuth={azimuth} totalAngle={10}/>
        <FOVComponent color={'#c50fc5'} distance={30000}  startPoint={startPoint} componentKey={'green-fov'} azimuth={azimuth } totalAngle={30}/>
    </Vector>
}