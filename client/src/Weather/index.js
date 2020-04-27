import React,{useState, useEffect} from 'react'
import ReactMapGL,{Marker, Popup} from "react-map-gl"
import * as $ from 'jquery';
import MarkerInfo from './MarkerInfo'
import PopupInfo from './PopupInfo'

//Manually added data of the locations and its info in production we would be making api calls for this
const locations = [{name: "Dease Lake"},{name: "Fort Nelson"},{name: "Terrace"},{name: "Prince George"},{name: "Whistler"},{name: "Revelstoke"},{name: "Creston"}]//Todo:

export default function Weather() {
  //longitude and latitude of bc so we can set that in the viewport of the map. In production you would be able select what provinces you wanna watch over with the help if a dropdown select if the chain as franchises across the country.
  const [viewport,setViewport] = useState({  //Todo: cleanup the states by adding Redux to the production
    latitude:	54.726669,
    longitude: -127.647621,
    width: "100vw",
    height: "100vh",
    zoom: 5
  })
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)
  

  const getWeatherData = (locations) => { //Todo: put this function in a seperate file to clean up index file
    //requests get a array of promises with API calls per location.
    const requests = locations.map( (location) => { //Also unit test this function with fake data
      return new Promise( (resolve, reject) => {
        $.ajax({ //Todo: use axios instead of jquery it will help with testing
          url: "https://api.weatherstack.com/current",
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
      //Checks the array for errors.
      const errors = values.every( value => value.error
      )
      //if no errors are found we set values to data else we print errors.
      if(!errors){ //Todo: 
        setData(values)
      }else{
        console.log("Trouble retrieving live weather data from API")
      }
    })
  }
  //gets data once and sets up updates every 60 mins. 
  //Todo: In production user can choose how often or what time it should get the latest data.
  useEffect( () => {
    getWeatherData(locations)
    //Will get new data every hour  and update the app.
    setInterval(function(){
        getWeatherData(locations)
    }, 60*60*1000)
  },[])

  return (
    <ReactMapGL {...viewport}   
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //Without this function user can't move around or zoom in/out on the map.
      //Camera currently locked since user will be focusing on only the cities in BC. In production if you have franchises across the country your viewport would locked inside the country so you can move around and zoom in/out on it.
      // onViewportChange={viewport => setViewport(viewport)}  //Todo: Unlock letting the user move around the map maybe lock it to a country 
      mapStyle="mapbox://styles/kansd1401/ck9c4xsfg07sc1io0kb0jsvi0">
        {data !== null && data.map( (city,i) => 
            <MarkerInfo 
              key={i}
              onClick={() => setSelected(city)}
              current={city.current}
              location={city.location}
              selected={selected ? selected.location.name === city.location.name: false}
            />)}
          {selected !== null && <PopupInfo {...selected} setSelected={setSelected}/>}
    </ReactMapGL>)
}