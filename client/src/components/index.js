import React,{useState, useEffect} from 'react'
import ReactMapGL,{Marker, Popup} from "react-map-gl"
import * as $ from 'jquery';
import MarkerInfo from './MarkerInfo'
import PopupInfo from './PopupInfo'

//Manually added data of the locations and its info in production we would be making api calls for this
const locations = [{name: "Dease Lake"},{name: "Fort Nelson"},{name: "Terrace"},{name: "Prince George"},{name: "Whistler"},{name: "Revelstoke"},{name: "Creston"}]

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
      //Gets all the errors and puts them into an array
      const errors = values.every( value => value.error
      )
      console.log(values)
      //if no errors are found we set values to data else we print errors
      if(!errors){
        setData(values)
      }else{
        console.log("Trouble retrieving live weather data from API")
      }
    })
  }

  useEffect( () => {
    getWeatherData(locations)
    //Will get new data every hour    
    setInterval(function(){
        getWeatherData(locations)
    }, 60*60*1000)
  },[])

  return (
    <ReactMapGL {...viewport}   
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //Without this function user can't move around or zoom in/out on the map.
      onViewportChange={viewport => setViewport(viewport)}
      mapStyle="mapbox://styles/kansd1401/ck9c4xsfg07sc1io0kb0jsvi0">
        {data !== null && data.map( (city,i) => 
          <Marker key={i} latitude={Number(city.location.lat)} longitude={Number(city.location.lon)}> 
            <MarkerInfo 
              onClick={() => setSelected(city)}
              current={city.current}
              name={city.location.name}
              selected={selected ? selected.location.name === city.location.name: false}
            />
          </Marker>)}
          {selected !== null && 
          <Popup latitude={Number(selected.location.lat)} longitude={Number(selected.location.lon)} onClose={()=> setSelected(null)}>
            <PopupInfo className="container-popup" {...selected}>
            </PopupInfo>
          </Popup>}
    </ReactMapGL>)
}