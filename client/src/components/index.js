import React,{useState} from 'react'
import ReactMapGL from "react-map-gl"

export default function Weather() {
  //longitude and latitude of bc so we can set that in the viewport of the map
  const [viewport,setViewport] = useState({
    latitude:	53.726669,
    longitude: -127.647621,
    width: "100vw",
    height: "100vh",
    zoom: 5
  })
  return (
  <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  onViewportChange={viewport => setViewport(viewport)}
  mapStyle="mapbox://styles/kansd1401/ck9c4xsfg07sc1io0kb0jsvi0"> </ReactMapGL>)
}