import React, { useState } from 'react';
import fieldpositions from '../assets/fieldpositions.png';

const AllianceSelection = ({teamNumber, setTeamNumber, setPosition, position, matchNumber, color}) => {
    // Function to toggle the selected color to Blue


    const setPos = (selected) => {
        setPosition(selected);  // Set the selected position state
      };
    
    const positions = ['A', 'B', 'C'];



    // Handling change in team number input
    const handleTeamNumberChange = (e) => {
        setTeamNumber(e.target.value); // Update team number state when input changes
    };

    // Expose the current state values (selected color and team number)
    return (
        <div id="alliance" className="alliance-selection-container nav">
            <h1>Match #{matchNumber} Details</h1>
            <div className="input">
                <p className="inputLabel">Team Number: </p>
                <input
                    className="numberInput"
                    type="number"
                    value={teamNumber} // Controlled input for team number
                    onChange={handleTeamNumberChange} // Update state when input changes
                />
            </div>
            <img className="fieldpositionsimage" src={fieldpositions} alt="Field Positions" />
            <div className="input">
                <p className="inputLabel">Starting Position: </p>
                <div className="buttonGrid">
                {/* Loop over positions to create dynamic buttons */}
                {positions.map((pos, index) => (
                    <button
                    key={index}
                    onClick={() => setPos(pos)} // Dynamically call setPosition with the position value
                    className={position === pos ? `positionButton selected ${pos.toLowerCase()}` : `positionButton ${pos.toLowerCase()}`}
                    >
                    {pos}
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AllianceSelection;
