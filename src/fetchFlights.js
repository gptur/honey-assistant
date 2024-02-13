const fetchFlights = async (destinationId) => {
    const url = `https://priceline-com-provider.p.rapidapi.com/v2/flight/downloadAirports?limit=500`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '10a3df6194msh10bb509fc2f1f3ap1e19e7jsn3d4d4c807cad',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.flights.filter(flight => flight.destination_city === destinationId);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export default fetchFlights;
  