// LeftSidebar.js
import React from 'react';
import { Paper, Typography } from '@mui/material';
import funnyFactsData from './funny_facts.json';

const LeftSidebar = ({ selectedCountry }) => {
  return (
    <div style={{ flex: 1 }}>
      <Paper elevation={3} style={{ backgroundColor: '#ffcc80', height: '100%', overflowY: 'auto' }}>
        <Typography variant="h6" style={{ padding: '16px' }}>
          Funny Fact
        </Typography>
        <Typography style={{ padding: '16px' }}>{selectedCountry ? funnyFactsData[selectedCountry.id] : 'Select a country'}</Typography>
      </Paper>
    </div>
  );
};

export default LeftSidebar;
