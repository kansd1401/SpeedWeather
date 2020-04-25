import React from 'react'
import './PopupInfo.scss'

export default function PopupInfo(props) {
const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
const day = new Date()
  return (
      <div className="popup">
        <div className="popup__left">
          <div className="popup__location">
            <p className="popup__location--city">{props.location.name},</p>
            <p className="popup__location--time">{`${days[day.getDay()]} ${props.current.observation_time}`}</p>
            <p className="popup__location--desc">{props.current.weather_descriptions[0]}</p>
          </div>
          <div className="popup__info">
            <img className="popup__img" src={props.current.weather_icons[0]} />
            <div className="popup__info--temp">
              <p>{props.current.temperature}</p>
              <div>°C</div>
            </div>          
          </div>
        </div>
        <div className="popup__right">
          <div className="popup__stats">
              <p>Humidity: {props.current.humidity} %</p>
              <p>Wind: {props.current.wind_speed} km/h</p>
              <p>Visibility: {props.current.visibility} km</p>
          </div>
        </div>
      </div>
  )
}