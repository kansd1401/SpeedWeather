import React from 'react'

export default function MarkerInfo(props) {
  return (
      <div>
        <img src={city.current.weather_icons[0]} />
        <div>
          <div>
            <h3>{city.location.name}</h3>
            <p>{city.current.temperature}°C</p>
          </div>
          <p>{city.current.weather_descriptions[0]}</p>
        </div>
      </div>
  )

}