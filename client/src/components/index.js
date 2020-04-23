import React,{useState, useState} from 'react'
import ReactMapGL from "react-map-gl"

export default function Weather() {
  //longitude and latitude of bc so we can set that in the viewport of the map
  const [viewport,setViewport] = useState({
    latitude:	53.726669,
    longitude: -127.647621
  })
  return (
  <ReactMapGL
    id="script-loader"
    googleMapsApiKey="AIzaSyDuHIRR0pMmreEoEFimNbRkjWxTGCMEuMo">
    <GoogleMap
      id='example-map'
    >
      ...Your map components
    </GoogleMap>
  </ReactMapGL>)
}