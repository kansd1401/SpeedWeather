import React,{useState, useEffect} from 'react'
import ReactMapGL,{Marker, Popup} from "react-map-gl"
import * as $ from 'jquery';
import MarkerInfo from './MarkerInfo'

//Manually added data of the locations and its info in production we would be making api calls for this
const locations = [{name: "Dease Lake",id: 1, latitude: 58.472618, longitude: -130.016815},{name: "Fort Nelson",id: 2, latitude: 58.805016, longitude: -122.697235},{name: "Terrace",id: 3, latitude: 54.518829, longitude: -128.611404},{name: "Prince George",id: 4, latitude: 53.912581, longitude: -122.747775},{name: "Whistler",id: 5, latitude: 50.116003, longitude: 122.959426},{name: "Revelstoke",id: 6, latitude: 50.997047, longitude:-118.197822},{name: "Creston",id: 7, latitude: 49.095543 , longitude: -116.503134}]

export default function Weather() {
  //longitude and latitude of bc so we can set that in the viewport of the map
  const [viewport,setViewport] = useState({
    latitude:	53.726669,
    longitude: -127.647621,
    width: "100vw",
    height: "100vh",
    zoom: 5
  })
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)

  const getWeatherData = (locations) => {
    const requests = locations.map( (location) => {
      return new Promise( (resolve, reject) => {
        $.ajax({
          url: "http://api.weatherstack.com/current",
          type: "GET",
          data: { 
            access_key: process.env.REACT_APP_WEATHERSTACK_TOKEN,
            query: `${location.name}, British Columbia`
          },
          success: (res) => {
            resolve(res)
          },
          error: (res) => {
            console.log(res)
            reject(res)
          }
        })
      })
    })
    Promise.all(requests).then((values) => {
      setData(values)
      console.log(data)
    })
  }

  useEffect( () => {
    getWeatherData(locations)
  },[])

  return (
    <ReactMapGL {...viewport}   
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //Without this function user can't move around or zoom in/out on the map.
      onViewportChange={viewport => setViewport(viewport)}
      mapStyle="mapbox://styles/kansd1401/ck9c4xsfg07sc1io0kb0jsvi0">
        {data !== null ? data.map( (city,i) => 
          <Marker key={i} latitude={Number(city.location.lat)} longitude={Number(city.location.lon)}> 
            <MarkerInfo 
              onClick={() => setSelected(city)}
              current={city.current}
              name={city.location.name}
              selected={selected ? selected.location.name === city.location.name: false}
            />
          </Marker>): ""}
          {selected !== null && 
          <Popup latitude={Number(selected.location.lat)} longitude={Number(selected.location.lon)} onClose={()=> setSelected(null)}>
            yo
          </Popup>

          }
    </ReactMapGL>)
}