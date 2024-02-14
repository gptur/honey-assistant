import React, { useState } from 'react';
import './TopBar.css';

function TopBar({ startDate, endDate, onStartDateChange, onEndDateChange ,fetchFlights, selectedPin_id}) {
  return (
    <div className="top-bar">
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input type="date" id="startDate" value={startDate} onChange={function (e) {
            onStartDateChange(e.target.value)
}} />
      </div>
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input type="date" id="endDate" value={endDate} onChange={function (e)  {
            onEndDateChange(e.target.value);
            fetchFlights(selectedPin_id);
        }

            } />
      </div>
    </div>
  );
}

export default TopBar;
