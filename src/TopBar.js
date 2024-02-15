import React, { useEffect } from 'react';
import './TopBar.css';

function TopBar({ startDate, endDate, onStartDateChange, onEndDateChange, fetchFlights, selectedPin_id }) {
  useEffect(() => {
    if (endDate !== '') { // Ensure endDate is not empty before calling fetchFlights
      fetchFlights(selectedPin_id);
    }
  }, [endDate, selectedPin_id]);
  
  return (
    <div className="container">
        <div className="logo">
            <span className="logo-text">ANYWHERE</span>
            <span className="logo-sub-text">By GPTur</span>
          </div>
        <div className='search-info'>  
          <div className="from-to">
            <div className="from-to-div-value">
              <span className="search-info-label">From</span>
              <span className="from-to-choice-text">Lisbon</span>
            </div>
            <div className="frame">
              <div className="group">
                <img src="airplane.svg" alt="Vector7150" className="vector" />
              </div>
            </div>
            <div className="from-to-div-value">
              <span className="search-info-label">To</span>
              <span className="from-to-choice-text">Anywhere</span>
            </div>
          </div>
          <div className="date">
            <div className="from">
              <span className="search-info-label">Departure</span>
              <input type="date" id="startDate" className='from-to-choice-date' value={startDate} onChange={function(e) {
                onStartDateChange(e.target.value)
                }} />
            </div>
            <div className="iconplane">
              <div className="i-go1-ca2">
                <div className="group1">
                  <img src="calendar_ico.svg" alt="Vector7152" className="vector1" />
                </div>
              </div>
            </div>
            <div className="to">
              <span className="search-info-label">Return</span>
              <input type="date" id="endDate" className='from-to-choice-date' value={endDate} onChange={(e) => {
                onEndDateChange(e.target.value)
              }} />
            </div>
          </div>
          <div className="search-info-dropdown">
            <span className="search-info-dropdown-label">Round Trip</span>
            <img src="arrow_down_ico.svg" alt="Polygonicon7152" className="polygonicon" />
          </div>
          <div className="search-info-dropdown">
            <div className="y-z-kw-h8tif1">
              <div className="group2">
                <img src="person_ico.svg" alt="Vector7153" className="vector3" />
              </div>
            </div>
            <span className="search-info-dropdown-label">1</span>
            <img src="arrow_down_ico.svg" alt="Vector7153" className="vector4" />
          </div>
        </div>
        <div> </div>
      </div>
  );
}

export default TopBar;
