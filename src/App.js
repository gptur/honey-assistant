// App.js
import Topbar from './Topbar';
import LeftSidebar from './Leftbar';
import RightSidebar from './Sidebar';
import { Container, Grid, Paper } from '@mui/material';

import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchFlightOffers } from './FlightAPI';
import airportCodes from './airport_codes.json';

import places_json from './places.json'

function MapboxComponent() {
  const [selectedPin, setSelectedPin] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState( '');
  const [endDate, setEndDate] = useState( '');
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpc2NvY2FsZGFzIiwiYSI6ImNsc2Y5MDYyNzFhNnUyamw1bjhsbTc3bjAifQ.4ypYMELBLioE2ZVgf9pfjA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/franciscocaldas/clsmc2pye003401pkciheh8y9',
      center: [-9.1406, 38.7223], // Lisbon
      zoom: 1.5
    });

    map.on('load', () => {
      // Load an image from an external URL.
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Simple_orange_circle.svg/30px-Simple_orange_circle.svg.png?20220311203936', (error, image) => {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('pin', image);
        map.setLayoutProperty("country-label","text-padding",5)
      });

          var places = places_json.features;
          

          map.addSource('places', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': places
            }
          });

          places.forEach(function (place) {
            var coordinates = place.geometry.coordinates;

            // Add pin icon
            map.addLayer({
              'id': 'places-' + place.properties.title,
              'type': 'symbol',
              'icon': 'theatre',
              'source': 'places',
              'layout': {
                'icon-image': 'pin', // Mapbox marker icon
                'icon-allow-overlap': true,
                'text-allow-overlap': true,
                'icon-size': .4,
                //'icon-offset':[0,-100],
              },
              'paint': {}
            });

            // // Add label
            // map.addLayer({
            //   'id': 'label-' + place.properties.title,
            //   'type': 'symbol',
            //   'source': 'places',
            //   'layout': {
            //     'text-field': ['get', 'title'],
            //     'text-font': ['Open Sans Regular'],
            //     'text-size': 16,
            //     'text-anchor': 'top',
            //     'text-offset': [0, -3],
            //     'icon-allow-overlap': true
            //   },
            //   'paint': {
            //     'text-color': '#000000'
            //   },
          //   // });
          

          });
          places.forEach(function (place) {
            var coordinates = place.geometry.coordinates;

            


            // Add line from Lisbon to place
            map.addLayer({
              'id': 'line-' + place.properties.title,
              'type': 'line',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                      [-9.1406, 38.7223], // Lisbon
                      coordinates
                    ]
                  }
                }
              },
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': 'green',
                'line-width': 2
              }
            });

            map.on('click', 'places-' + place.properties.title, function (e) {
              setSelectedPin(e.features[0]);
              fetchFlights(e.features[0].id);
            });
          });

          setLoading(false); // Set loading to false after data is loaded
    });
  }, []);

  

const fetchFlights = async (destinationId) => {
  try {
    setLoading(true);

    // Create an instance of AbortController
    const abortController = new AbortController();
    const signal = abortController.signal;

    const originCode = 'LIS'; // Assuming Lisbon is the origin
    const destinationCode = airportCodes.codes[destinationId];
    const maxPrice = 250; // Example maximum price

    // Example dates (use startDate and endDate state values instead)
    const departureDate = startDate || '2024-07-15';
    const returnDate = endDate || '2024-07-20';

    // Check if there's an ongoing fetch, if yes, abort it
    if (fetchFlights.currentRequest) {
      fetchFlights.currentRequest.abort();
    }

    // Store the current fetch request
    fetchFlights.currentRequest = abortController;

    const data = await fetchFlightOffers(originCode, destinationCode, departureDate, returnDate, maxPrice, signal);
    setLoading(false);
    setFlights(data.data);

  } catch (error) {
    console.error('Error fetching flight offers:', error);
  }
};


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Topbar
        departure={departure}
        setDeparture={setDeparture}
        arrival={arrival}
        setArrival={setArrival}
      />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <LeftSidebar selectedCountry={arrival} />
        <div style={{ flex: 6 }}>
          <div id="map" style={{ height: '100%', overflowY: 'auto' }}></div>
        </div>
        <RightSidebar selectedCountry={arrival} />
      </div>
    </div>
  );
};

export default MapboxComponent;
