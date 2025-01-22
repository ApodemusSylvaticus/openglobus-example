import { Ellipsoid } from '@openglobus/og';
import {LonLat} from "@openglobus/og/lib/js/LonLat";

export function getArc(ellipsoid: Ellipsoid, center: LonLat, angel: number, totalAngel: number, dist: number, hStart: number, hEnd:number) {
    const resultArray: LonLat[] = [];

    const startPosition = ellipsoid.getGreatCircleDestination(center, 0, 0);
    startPosition.height = hStart;
    resultArray.push(startPosition);

    if (totalAngel <= 0) {
        const point = ellipsoid.getGreatCircleDestination(startPosition, angel, dist);
        point.height = hEnd;
        resultArray.push(point);
        return resultArray;
    }

    const step = 0.1;
    for (let i = -totalAngel / 2; i <= totalAngel / 2; i += step) {
        const point = ellipsoid.getGreatCircleDestination(startPosition, angel + i, dist);
        point.height = hEnd;
        resultArray.push(point);
    }


    resultArray.push(startPosition);
    return resultArray;
}