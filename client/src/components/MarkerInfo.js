import React from 'react'
import './MarkerInfo.scss'

export default function MarkerInfo(props) {
  return (
      <div className="marker" onClick={props.onClick}>
        <img className="marker__img" src={props.current.weather_icons[0]} />
        <div className="marker__info">
          <p>{props.name}</p>
          <div className="marker__info--temp">
            <p>{props.current.temperature}</p>
            <div>°C</div>
          </div>          
        </div>
      </div>
  )

}