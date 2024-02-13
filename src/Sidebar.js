import React from 'react';

function FlightSegment({ segment }) {
  return (
    <div style={{ marginLeft: '20px' }}>
      <strong>Departure City:</strong> {segment.departure.iataCode}<br />
      <strong>Destination City:</strong> {segment.arrival.iataCode}<br />
      <strong>Departure Time:</strong> {new Date(segment.departure.at).toLocaleString()}<br />
      <strong>Arrival Time:</strong> {new Date(segment.arrival.at).toLocaleString()}<br />
      <br />
    </div>
  );
}

function Flight({ flight }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <strong>Departure City:</strong> {flight.itineraries[0].segments[0].departure.iataCode}<br />
      <strong>Destination City:</strong> {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}<br />
      <strong>Departure Time:</strong> {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}<br />
      <strong>Arrival Time:</strong> {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleString()}<br />
      <strong>Price:</strong> {flight.price.currency} {flight.price.total}<br />
      <h4>Segments:</h4>
      {flight.itineraries[0].segments.map((segment, segmentIndex) => (
        <FlightSegment key={segmentIndex} segment={segment} />
      ))}
    </div>
  );
}

function Sidebar({ selectedPin, flights }) {
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: '20%', height: '100%', backgroundColor: 'lightgray', padding: '10px', overflowY: 'scroll' }}>
      {selectedPin && (
        <div>
          <h2>{selectedPin.properties.title}</h2>
          <h3>Flights:</h3>
          {flights.map((flight, index) => (
            <Flight key={index} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
