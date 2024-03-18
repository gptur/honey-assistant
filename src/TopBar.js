// Topbar.js
import React from 'react';
import { AppBar, Toolbar, TextField, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import countriesData from './countries.json';

const Topbar = ({ departure, setDeparture, arrival, setArrival, selectedCountry, setSelectedCountry }) => {
  const handleSearch = () => {
    // Perform search or any other action
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Autocomplete
              id="departure-autocomplete"
              options={countriesData}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => setDeparture(value)}
              value={departure}
              renderInput={(params) => <TextField {...params} label="Departure" variant="outlined" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="arrival-autocomplete"
              options={countriesData}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => setArrival(value)}
              value={arrival}
              renderInput={(params) => <TextField {...params} label="Arrival" variant="outlined" />}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure Date"
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => <TextField {...params} variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Arrival Date"
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => <TextField {...params} variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
