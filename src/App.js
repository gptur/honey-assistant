import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import Sidebar from './Sidebar';
import { fetchFlightOffers } from './FlightAPI';
import airportCodes from './airport_codes.json';

function MapboxComponent() {
  const [selectedPin, setSelectedPin] = useState("");
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpc2NvY2FsZGFzIiwiYSI6ImNsc2Y5MDYyNzFhNnUyamw1bjhsbTc3bjAifQ.4ypYMELBLioE2ZVgf9pfjA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-9.1406, 38.7223], // Lisbon
      zoom: 1.5
    });

    map.on('load', () => {
      // Load an image from an external URL.
      map.loadImage('https://cdn-icons-png.flaticon.com/256/2776/2776067.png', (error, image) => {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('pin', image);
      });

      fetch('places.json')
        .then(response => response.json())
        .then(data => {
          var places = data.features;

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
                'icon-size': 0.1,
                'icon-offset':[0,-100],
              },
              'paint': {}
            });

            // Add label
            map.addLayer({
              'id': 'label-' + place.properties.title,
              'type': 'symbol',
              'source': 'places',
              'layout': {
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Regular'],
                'text-size': 16,
                'text-anchor': 'top',
                'text-offset': [0, -3],
                'icon-allow-overlap': true
              },
              'paint': {
                'text-color': '#000000'
              },
            });

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
                'line-color': '#4264fb',
                'line-width': 2
              }
            });
            fetch(`flights_${1}.json`)
              .then(response =>console.log(response))

            map.on('click', 'places-' + place.properties.title, function (e) {
              setSelectedPin(e.features[0]);
              fetchFlights(e.features[0].id);


            });
          });
        });
    });
  }, []);

  const fetchFlights = async (destinationId) => {
    try {
      const originCode = 'LIS'; // Assuming Lisbon is the origin
      const destinationCode = airportCodes.codes[destinationId];
      const departureDate = '2024-02-15'; // Example departure date
      const maxPrice = 250; // Example maximum price

      const data = await fetchFlightOffers(originCode, destinationCode, departureDate, maxPrice);
      setFlights(data.data);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  // const fetchFlights = (destinationId) => {
  //   let pth = `flights_data/flights_${destinationId}.json`
  //   console.log(pth)
  //   fetch(pth)
  //   .then(response => {
      
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     setFlights(data.flights);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching flights:', error);
  //   });
  // };

  return (
    <div>
      <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '80%' }}></div>
      <Sidebar selectedPin={selectedPin}  flights={flights}/>
    </div>
  );
}

export default MapboxComponent;
