import React from 'react';
import { Paper, Card, CardContent, Typography } from '@mui/material';
import tripsData from './fake_trips.json';

const RightSidebar = ({ selectedCountry }) => {
  // Filter trips data based on selected country id
  const countryTrips = selectedCountry ? tripsData[selectedCountry.id] : [];

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Flights Information {selectedCountry? selectedCountry.name: ''}
      </Typography>
      {countryTrips.map((trip, index) => (
        <Card key={index} elevation={3} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {trip.from} to {trip.to}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Price: ${trip.price.toString()}, Hours: {trip.departure} to {trip.arrival}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Airport Code: {trip.airportCode}, Airline: {trip.airline}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default RightSidebar;
