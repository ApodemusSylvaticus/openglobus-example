import React, {useCallback} from "react";
import {Entity, Polyline, useGlobeContext} from "@openglobus/openglobus-react";
import {useEffect, useRef} from "react";
import {getArc} from "./getArc.ts";
import {LonLat} from "@openglobus/og/lib/js/LonLat";

const fps = 1 / 60;

type VisibleSectorProps = {
    totalAngle: number;
    componentKey: string;
    startPoint: LonLat;
    color: string;
    distance: number;
    azimuth: number;
    hStart: number;
    hEnd: number;
};

export const FOVComponent: React.FC<VisibleSectorProps> = React.memo(
    ({ totalAngle, componentKey, startPoint, color, distance, azimuth, hStart, hEnd }) => {
        const { globe } = useGlobeContext();

        if (globe === null) {
            throw new Error('Globe is undefined for VisibleSector component');
        }
        const tempAzimuthForAnimate = useRef(azimuth);
        const refAzimuth = useRef(azimuth);
        const refStartPoint = useRef(startPoint);
        const refTotalAngle = useRef(totalAngle);
        const refDistance = useRef(distance);

        const [arcPath, setArcPath] = React.useState<LonLat[]>([]);

        useEffect(() => {
            refTotalAngle.current = totalAngle;
        }, [totalAngle]);

        useEffect(() => {
            refAzimuth.current = azimuth;
        }, [azimuth]);

        useEffect(() => {
            refStartPoint.current = startPoint;
        }, [startPoint]);

        useEffect(() => {
            refDistance.current = distance;
        }, [distance]);

        const setter = useCallback(() => {
            const ellipsoid = globe.planet.ellipsoid;
            const start = new LonLat(refStartPoint.current.lon, refStartPoint.current.lat, 100);

            setArcPath(getArc(ellipsoid, start, tempAzimuthForAnimate.current, refTotalAngle.current, refDistance.current, hStart, hEnd));
        }, [globe.planet.ellipsoid, hEnd, hStart]);

        useEffect(() => {
            setter();
        }, [setter /*distance*/]);

        useEffect(() => {
            let diff = 0;
            let tempAzimuth = 0;

            const handler = () => {
                if (refAzimuth.current !== tempAzimuthForAnimate.current) {
                    if (tempAzimuth !== refAzimuth.current) {
                        tempAzimuth = refAzimuth.current;
                        diff = (tempAzimuthForAnimate.current - refAzimuth.current) * fps;
                    }

                    if (diff === 0) {
                        diff = (tempAzimuthForAnimate.current - refAzimuth.current) * fps;
                    }

                    const a = Math.abs(tempAzimuthForAnimate.current - refAzimuth.current);
                    const b = Math.abs(diff);
                    if (a < b) {
                        tempAzimuthForAnimate.current = refAzimuth.current;
                        setter();
                    } else {
                        tempAzimuthForAnimate.current -= diff;
                        setter();
                    }
                }
            };

            globe.planet.events.on('draw', handler);
            return () => {
                globe.planet.events.off('draw', handler);
            };
        }, [globe, setter]);

        return (
            <Entity key={`${componentKey}`} lon={startPoint.lon} lat={startPoint.lat} alt={30}>
                <Polyline isClosed={true} path={[arcPath]} color={color} visibility={true} altitude={30} thickness={3} opacity={1}></Polyline>
            </Entity>
        );
    },
);