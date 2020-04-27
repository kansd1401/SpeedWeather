import React from 'react';
import './App.scss';
import Weather from "./Weather"

function App() {
  return (
    <div className="App">
      {/*Sidebar added so we can add more options and functionalities to the web app at production*/}
      <div className="sidebar">
        <h2>SpeedWeather</h2>
      </div>
      <Weather/>
      <div className="tip">
        <h3>Click on Cities for details!</h3>
      </div>
    </div>
  );
}

export default App;
