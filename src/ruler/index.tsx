import {useGlobeContext} from "@openglobus/openglobus-react";
import {useEffect} from "react";
import {control} from "@openglobus/og"

export const useRuler = () => {
    const { globe } = useGlobeContext();

    useEffect(() => {
        if (globe) {
            const ruler = new control.RulerSwitcher({
                ignoreTerrain: false,
            });
            globe.planet.addControl(ruler);

        }
    }, [globe]);
}

