import React, {useEffect, useState} from "react";
import {useGlobeContext, Vector} from "@openglobus/openglobus-react";
import {FOVComponent} from "./fovComponent.tsx";
import {LonLat} from "@openglobus/og/lib/js/LonLat";

export const FovManipulation: React.FC = () => {
    const {globe} = useGlobeContext();
    const startPoint = new LonLat(14.43619, 50.07526);


    const [azimuth, setAzimuth] = useState<number>(0)
    const [hStart, setHStart] = useState<number>(50);
    const [hEnd, setHEnd] = useState<number>(200);
    useEffect(() => {
       const interval = setInterval(() => setAzimuth(prev => prev + 10), 3000)
        return () => clearInterval(interval)
    }, []);

    if(globe === null){
        return null
    }


    return (<>
        <div style={{position: "absolute", display: 'flex', flexDirection: 'column', zIndex: 10, top: 100, left: 16}}>
            <div style={{position: 'absolute', display: 'flex', flexDirection: 'column'}}>
                <label>
                    hStart:
                    <input
                        type="number"
                        value={hStart}
                        onChange={(e) => setHStart(Number(e.target.value))}
                        style={{marginBottom: '8px'}}
                    />
                </label>
                <label>
                    hEnd:
                    <input
                        type="number"
                        value={hEnd}
                        onChange={(e) => setHEnd(Number(e.target.value))}
                    />
                </label>
            </div>
        </div>
        <Vector name={'FOV'}>
            <FOVComponent hEnd={hEnd} hStart={hStart} color={'#454545'} distance={25000} startPoint={startPoint}
                          componentKey={'yellow-fov'} azimuth={azimuth} totalAngle={10}/>
            <FOVComponent hEnd={hEnd} hStart={hStart} color={'#c50fc5'} distance={30000} startPoint={startPoint}
                          componentKey={'green-fov'} azimuth={azimuth} totalAngle={30}/>
        </Vector>
    </>)

}