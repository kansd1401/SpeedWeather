import React from 'react'
import './MarkerInfo.scss'
import {Marker} from "react-map-gl"

export default function MarkerInfo(props) {
  return (
    <Marker  latitude={Number(props.location.lat)} longitude={Number(props.location.lon)}> 
      {!props.selected &&
      <div className="marker" onClick={props.onClick}>
        <img className="marker__img" src={props.current.weather_icons[0]} />
        <div className="marker__info">
          <p>{props.location.name}</p>
          <div className="marker__info--temp">
            <p>{props.current.temperature}</p>
            <div>°C</div>
          </div>          
        </div>
      </div>}
    </Marker>
  )
}