import React from 'react';



function Sidebar({ selectedPin, flights }) {
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: '20%', height: '100%', backgroundColor: 'lightgray', padding: '10px' }}>
      {selectedPin && (
        <div>
          <h2>{selectedPin.properties.title}</h2>
          <h3>Flights:</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                <strong>Departure City:</strong> {flight.departure_city}<br />
                <strong>Destination City:</strong> {flight.destination_city}<br />
                <strong>Departure Time:</strong> {flight.departure_time}<br />
                <strong>Arrival Time:</strong> {flight.arrival_time}<br />
                <strong>Price:</strong> ${flight.price}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;