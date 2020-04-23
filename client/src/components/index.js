import React,{useState} from 'react'
import ReactMapGL from "react-map-gl"




Creston
const locations = [{name: "Dease Lake", latitude: 58.472618, longitude: -130.016815},{name: "Fort Nelson", latitude: 58.805016, longitude: -122.697235},{name: "Terrace", latitude: 54.518829, longitude: -128.611404},{name: "Prince George", latitude: 53.912581, longitude: -122.747775},{name: "Whistler", latitude: 50.116003, longitude: 122.959426},{name: "Revelstoke", latitude: 50.997047, longitude:-118.197822},{name: "Creston", latitude: 49.095543 , longitude: -116.503134}]

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