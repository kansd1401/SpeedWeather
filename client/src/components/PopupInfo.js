import React from 'react'
import './PopupInfo.scss'

export default function PopupInfo(props) {
const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
const day = new Date()
  return (
      <div className="popup" onClick={props.onClick}>
        <div className="popup__location">
          <p>{props.location.name},</p>
          <p>{`${days[day.getDay()]} ${props.current.observation_time}`}</p>
          <p>{props.current.weather_descriptions[0]}</p>

        </div>
        <img className="popup__img" src={props.current.weather_icons[0]} />
        <div className="popup__info">
          <div className="popup__info--temp">
            <p>{props.current.temperature}</p>
            <div>°C</div>
          </div>          
        </div>
      </div>
  )
}