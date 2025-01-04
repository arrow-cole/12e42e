import React, { useState } from 'react';

const MatchInfo = ({color, setColor, event, matchNumber, setEvent, setMatchNumber}) => {
  // Use state to store values for event and match number
    // Function to toggle the selected color to Red
  const setColorRed = () => {
      setColor((prev) => (prev !== "Red" ? "Red" : "")); // Toggle Red or reset
  };

  const setColorBlue = () => {
    setColor((prev) => (prev !== "Blue" ? "Blue" : "")); // Toggle Blue or reset
  };

  // Instead of using useImperativeHandle, expose values directly via props
  const getValues = () => ({
    event,
    matchNumber,
  });

  return (
    <div className="prematch-inputs-container nav" id="prematch">
      <h1>Match Details</h1>
      <div className="input">
                <p className="inputLabel">Alliance Color: </p>
                <button
                    onClick={setColorRed}
                    className={color === 'Red' ? "allianceButton inputButton red selected" : "allianceButton inputButton red"}
                >
                    Red
                </button>
                <button
                    onClick={setColorBlue}
                    className={color === 'Blue' ? "allianceButton inputButton blue selected" : "allianceButton inputButton blue"}
                >
                    Blue
                </button>
            </div>
      <div className="input">
        <p className="inputLabel">Event: </p>
        <select
          className="selectInput"
          value={event}
          onChange={(e) => setEvent(e.target.value)} // Update event state
        >
          <option value="Kentwood">Kentwood</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input">
        <p className="inputLabel">Match Number: </p>
        <input
          min={1}
          type="number"
          className="numberInput"
          value={matchNumber}
          onChange={(e) => setMatchNumber(Number(e.target.value))} // Update match number state
        />
      </div>
    </div>
  );
};

export default MatchInfo;
