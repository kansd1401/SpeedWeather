import React from 'react';
import './App.scss';
import Weather from "./components"

function App() {
  return (
    <div className="App">
      {/*Sidebar added so we can add more options and functionalities to the web app at a later stage*/}
      <div className="sidebar">
        <h1>SpeedWeather</h1>
      </div>
        <Weather/>
    </div>
  );
}

export default App;
