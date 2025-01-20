
import './App.css'
import {Globe, GlobeContextProvider} from "@openglobus/openglobus-react";
import {SelfMarker} from "./selfMarker.tsx";
import {FovManipulation} from "./fovManipulation.tsx";
import {CenterButton} from "./centerButton";

function App() {

  return (
      <GlobeContextProvider>
          <Globe name="myGlobe" minAltitude={500} maxAltitude={2500000}>
<SelfMarker/>
              <FovManipulation/>
              <CenterButton/>
          </Globe>
      </GlobeContextProvider>
  )
}

export default App
