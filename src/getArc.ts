import { Ellipsoid } from '@openglobus/og';
import {LonLat} from "@openglobus/og/lib/js/LonLat";

export function getArc(ellipsoid: Ellipsoid, center: LonLat, angel: number, totalAngel: number, dist: number) {
    const resultArray: LonLat[] = [];
    const height = 200;

    const startPosition = ellipsoid.getGreatCircleDestination(center, 0, 0);
    startPosition.height = 50;
    resultArray.push(startPosition);

    if (totalAngel <= 0) {
        const point = ellipsoid.getGreatCircleDestination(startPosition, angel, dist);
        point.height = height;
        resultArray.push(point);
        return resultArray;
    }

    const step = 0.1;
    for (let i = -totalAngel / 2; i <= totalAngel / 2; i += step) {
        const point = ellipsoid.getGreatCircleDestination(startPosition, angel + i, dist);
        point.height = height;
        resultArray.push(point);
    }

    console.log('resultArray', resultArray)

    resultArray.push(startPosition);
    return resultArray;
}