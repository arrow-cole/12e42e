import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import MatchScouting from './matchScoutingScreens/MatchScouting.js';
const API_URL = "https://script.google.com/macros/s/AKfycbxLJbsVlpvCpAMxjqhUC42btb5kCasuq1amVDzHEeBn_LXOm1KrgCR3-lLWYOPgY9oOJw/exec";
function App() {

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <h2>CRR ScoutX</h2>
      </div>
      <MatchScouting />
    </div>
  );
}

export default App;
