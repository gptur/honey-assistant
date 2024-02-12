import React, { useState, useEffect } from 'react';

function Sidebar({ selectedPin }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (selectedPin) {
      fetch(`../source/flights_data/flights_${selectedPin.id}.json`)
        .then(response => response.json())
        .then(data => {
          setFlights(data.flights);
        });
    }
  }, [selectedPin]);

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: '20%', height: '100%', backgroundColor: 'lightgray', padding: '10px', overflowY: 'scroll' }}>
      {selectedPin && (
        <div>
          <h2>{selectedPin.properties.title}</h2>
          <h3>Flights</h3>
          {flights.length > 0 ? (
            <div>
              {flights.map((flight, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <h4>Flight {index + 1}</h4>
                  <p>Departure City: {flight.departure_city}</p>
                  <p>Destination City: {flight.destination_city}</p>
                  <p>Departure Time: {flight.departure_time}</p>
                  <p>Arrival Time: {flight.arrival_time}</p>
                  <p>Price: {flight.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No flights available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
