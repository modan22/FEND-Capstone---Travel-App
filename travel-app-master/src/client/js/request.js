// Define base URLs and endpoints
const BASE_URL = 'http://localhost:8080';
const COUNTRY_API_URL = 'https://restcountries.eu/rest/v2/alpha/';

// Fetch weather forecast data based on latitude and longitude
async function getWeatherForecast(latitude, longitude) {
    try {
        const response = await fetch(`${BASE_URL}/forecast`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonRes = await response.json();
        return jsonRes;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

// Fetch image URL based on destination and country
async function getImageUrl(destination, country) {
    try {
        const response = await fetch(`${BASE_URL}/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination, country })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonRes = await response.json();
        return jsonRes.hits.length > 0 ? jsonRes.hits[0].largeImageURL : null;
    } catch (error) {
        console.error('Error fetching image URL:', error);
    }
}

// Fetch geographical coordinates based on destination
async function getGeoLocation(destination) {
    try {
        const response = await fetch(`${BASE_URL}/coordinates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonRes = await response.json();
        return jsonRes;
    } catch (error) {
        console.error('Error fetching geographical coordinates:', error);
    }
}

// Fetch country information based on country code
async function getCountryInfo(countryCode) {
    try {
        const response = await fetch(`${COUNTRY_API_URL}${countryCode}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonRes = await response.json();
        return {
            name: jsonRes.name,
            flag: jsonRes.flag
        };
    } catch (error) {
        console.error('Error fetching country information:', error);
    }
}

export { getWeatherForecast, getGeoLocation, getImageUrl, getCountryInfo };
