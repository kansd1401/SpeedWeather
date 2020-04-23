import React from 'react'
import './MarkerInfo.scss'

export default function MarkerInfo(props) {
  return (
      <div className="marker">
        <img className="marker__img" src={props.current.weather_icons[0]} />
        <div className="marker__info">
          <div className="marker__info--temp">
            <h3>{props.name}</h3>
            <p>{props.current.temperature}°C</p>
          </div>
          <p>{props.current.weather_descriptions[0]}</p>
        </div>
      </div>
  )

}