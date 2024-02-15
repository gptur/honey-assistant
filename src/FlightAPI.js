const fetchFlightOffers = async (originCode, destinationCode, departureDate, returnDate, maxPrice, signal) => {
    const token = await fetchAccessToken();
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destinationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&nonStop=false&max=10`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: signal // Pass the signal to the fetch options
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch flight offers: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };
  
  const fetchAccessToken = async () => {
    const clientId = 'uS5EhacEI4gBUsM2NX3cvtEWnguAfvmV';
    const clientSecret = '0zQH6bKT8HV3D8DE';
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.status}`);
    }
    const data = await response.json();
    return data.access_token;
  };
  
  export { fetchFlightOffers };
  