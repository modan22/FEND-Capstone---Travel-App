const $ = require('jquery');

// Retrieve and format the destination input
const getDestination = () => {
    let destination = document.getElementById('destination').value;
    if (destination) {
        destination = destination.toLowerCase();
        destination = destination.charAt(0).toUpperCase() + destination.slice(1);
    }
    return destination;
}

// Retrieve and format the start date input
const getStartingDate = () => {
    const startDate = document.getElementById('date_start').value.split('-');
    return startDate.join('/');
}

// Retrieve and format the return date input
const getReturnDate = () => {
    const returnDate = document.getElementById('date_end').value.split('-');
    return returnDate.join('/');
}

// Calculate the number of days between two dates
const countdown = (startDate, endDate) => {
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Update the modal with trip details and weather information
const updateModal = (trip) => {
    $('.mask').addClass('active');
    document.querySelector('.popover-modal').style.display = 'block';
    document.querySelector('.modal-header__text').innerText = `${trip.destination}, ${trip.country}`;
    document.querySelector('.destination__img').setAttribute('src', trip.image);
    const tripStart = formatDate(trip.startDate);
    const tripEnd = formatDate(trip.endDate);
    const duration = countdown(trip.startDate, trip.endDate);

    document.querySelector('.modal_destination').innerHTML = `${trip.destination}, ${trip.country}`;
    document.querySelector('.start_date').innerHTML = `${tripStart}`;
    document.querySelector('.end_date').innerHTML = `${tripEnd}`;
    document.querySelector('.duration').innerHTML = `${duration} days`;

    const daysLeft = countdown(new Date(), tripStart);
    document.querySelector('.trip_countdown').innerHTML = `Your trip to ${trip.destination} is ${daysLeft} days away.`;

    showWeatherForecastElem(trip, daysLeft, tripStart);
}

// Display the weather forecast based on the days left until the trip
const showWeatherForecastElem = (trip, daysLeft, tripStart) => {
    const weather = getWeatherInfo(trip.weatherForecast, daysLeft, tripStart);
    const weatherElem = document.querySelector('.trip_weather');
    if (daysLeft < 7) {
        weatherElem.innerHTML = `
            <p><b>The current weather:</b><br/>
                <span>Temperature: ${weather.temperature}&deg;F</span><br/>
                <span>${weather.summary}</span>
            </p>`;
    } else {
        weatherElem.innerHTML = `
            <p><b>Weather forecast for then:</b><br/>
                <span>High - ${weather.forecastTempMax}&deg;F</span><br/>
                <span>Low - ${weather.forecastTempMin}&deg;F</span><br/>
                <span>${weather.forecastSummary}</span>
            </p>`;
    }
}

// Format a date into a more readable string
const formatDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const tripDate = new Date(date);
    return `${days[tripDate.getDay()]}, ${months[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;
}

// Extract and format weather information from the weather forecast data
const getWeatherInfo = (weatherForecast, daysLeft, date) => {
    const weather = {
        temperature: 0,
        summary: '',
        forecastTempMax: 0,
        forecastTempMin: 0,
        forecastSummary: ''
    };

    weather.temperature = weatherForecast.currently.temperature;
    weather.summary = weatherForecast.currently.summary;

    date = Date.parse(date);

    for (let i = 0; i < weatherForecast.daily.data.length; i++) {
        if (date >= weatherForecast.daily.data[i].time) {
            weather.forecastTempMax = weatherForecast.daily.data[i].temperatureMax;
            weather.forecastTempMin = weatherForecast.daily.data[i].temperatureMin;
            weather.forecastSummary = weatherForecast.daily.data[i].summary;
            break;
        }
    }
    return weather;
}

// Display saved trip details
const displaySavedTrip = (trip) => {
    const tripStart = formatDate(trip.startDate);
    const tripEnd = formatDate(trip.endDate);
    const duration = countdown(trip.startDate, trip.endDate);
    const daysLeft = countdown(new Date(), tripStart);
    const weather = getWeatherInfo(trip.weatherForecast, daysLeft, tripStart);

    const section = document.createElement('section');
    const div = document.createElement('div');
    div.classList.add('trip');
    div.innerHTML = `
        <div class="modal-body left-side">
            <img class="destination__img" src="${trip.image}" alt="Popular Image for Destination">
        </div>
        <div class="modal-body right-side">
            <p><b>Trip to:</b> <span class="destination">${trip.destination}</span></p>
            <p><b>Departure:</b> <span class="start_date">${tripStart}</span></p>
            <p><b>Return:</b> <span class="end_date">${tripEnd}</span></p>
            <p><b>Duration:</b> <span class="duration">${duration}</span></p>
            <span class="trip_countdown">Your trip to ${trip.destination} is ${daysLeft} days away.</span>
        </div>`;
    section.appendChild(div);
    document.querySelector('.saved-trips').appendChild(section);
}

export { getDestination, getStartingDate, getReturnDate, countdown, updateModal, displaySavedTrip };
