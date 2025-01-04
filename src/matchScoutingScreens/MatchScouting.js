import React, { useState } from 'react';
import '../App.css';
import arrow from '../assets/arrow.png';
import MatchDetails1 from './MatchDetails1.js';
import MatchDetails2 from './MatchDetails2.js';
// import MatchPositions from './MatchPositions.js';
import done from '../assets/done.png';
const API_URL = "https://script.google.com/macros/s/AKfycbwbCRRCiUVa2aeWPGPPxvN_KgqfY94lMmTN9WvbBS41f7jYixeSsl0Mc4RWeoF4kaOBTw/exec";

const MatchScouting = () => {
  const [index, setIndex] = useState(0);
  const [nextImgSrc, setNextImgSrc] = useState(arrow);
  const [event, setEvent] = useState('Kentwood');
  const [matchNumber, setMatchNumber] = useState(1);
  const [position, setPosition] = useState(null);
  const [color, setColor] = useState(""); // Initialize selected color as an empty string
  const [teamNumber, setTeamNumber] = useState(""); // Initialize team number as an empty string

  const pages = [
      <MatchDetails1 matchNumber={matchNumber} color={color} setColor={setColor} event={event} setEvent={setEvent} setMatchNumber={setMatchNumber}/>,
      <MatchDetails2 teamNumber={teamNumber} setTeamNumber={setTeamNumber} setPosition={setPosition} position={position} matchNumber={matchNumber}/>,
  ];

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1); // Update the state to trigger a re-render
      setNextImgSrc(arrow);
    }
  }

  const handleNextClick = () => {
    if (index < pages.length - 1) {
      setIndex(index + 1); // Update the state to trigger a re-render
      if (index + 2 === pages.length) {
        setNextImgSrc(done); // Change the next button to the "done" image
      }else {
        setNextImgSrc(arrow);
      }
    } 
  }

  const getTimestamp = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const sendData = (data) => {
    const appsScriptURL = API_URL;
    const formData = new FormData();
    formData.append("action","add_scouting_data");
    formData.append("data", JSON.stringify(data));
    formData.append("type","match");

    fetch(appsScriptURL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleSubmit = () => {
    var data = getData()
    for (var object in data) {
      console.log(data[object]);
      if (data[object] == "" || data[object] == undefined || data[object] == null) {
        if (object !== "divider") {
          alert(object + " has empty value");
          return;
        }
      }
    }
    if (window.confirm("submit data?")) {
      sendData(data);
      // setIndex(0);
      // setNextImgSrc(arrow);
      setMatchNumber(matchNumber + 1);
      setTeamNumber("");
      setPosition(null);
    }
  }

  const getData = () => {
    var data = {        
        divider: '',
        timeStamp: getTimestamp(),
        eventName: event,
        matchNumber: matchNumber,
        allianceColor: color,
        teamNumber: teamNumber,
        startLocation: position
    }
    console.log(data);
    return data;
  }

  return (
    <div className="App">
      <h1 className="title">Match Scouting</h1>
      <div className="main-content">
        {/* Keep all pages mounted but toggle visibility using CSS */}
        <div className="inputs" style={{borderColor: color}}>
          {pages.map((page, idx) => (
            <div
              key={idx}
              className={`page ${idx === index ? 'active' : 'hidden'}`}
            >
              {page}
            </div>
          ))}
        </div>
        <div id="lowerNav">
          <button
            onClick={handlePrevClick}
            className={index <= 0 ? 'navButton inactive' : 'navButton'}
          >
            <img
              src={arrow}
              alt="Previous"
              className="prevImg"
            />Previous
          </button>
          <button
            onClick={index + 1 >= pages.length ? handleSubmit : handleNextClick}
            className={index + 1 >= pages.length ? 'navButton submit' : 'navButton'}
          >
            <img
              src={nextImgSrc}
              alt="Next"
              id="_next"
              name="_next"
            />{index + 1 >= pages.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchScouting;
