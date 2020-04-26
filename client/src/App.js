import React from 'react';
import './App.scss';
import Weather from "./components"

function App() {
  return (
    <div className="App">
      {/*Sidebar added so we can add more options and functionalities to the web app at a later stage*/}
      <div className="sidebar">
        <h2>SpeedWeather</h2>
      </div>
      <Weather/>
      <div className="tip">
        Click on the marker for more info!
      </div>
    </div>
  );
}

export default App;
