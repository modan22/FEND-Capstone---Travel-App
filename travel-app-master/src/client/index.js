import './styles/layout.scss';
import './styles/index.scss';
import './styles/nav.scss';
import './styles/modal.scss';
import './styles/footer.scss';
import { getDestination, getStartingDate, getReturnDate, countdown, updateModal, displaySavedTrip } from '../client/js/utils.js';
import { getWeatherForecast, getGeoLocation, getImageUrl } from '../client/js/request.js';
const $ = require('jquery');

const trip = {};
const trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];
const searchBtn = document.getElementById('button_search');
const cancelBtn = document.getElementById('btn-cancel_modal');
const saveTripBtn = document.getElementById('btn-save_trip');
const deleteAllTripsBtn = document.getElementById('btn-delete_all');
const createNewTripBtn = document.getElementById('btn-add_new_trip');

// Function to handle trip search
const performAction = async (e) => {
    e.preventDefault();

    trip.destination = getDestination();
    trip.startDate = getStartingDate();
    trip.endDate = getReturnDate();

    if (trip.destination && trip.startDate && trip.endDate && (trip.startDate < trip.endDate)) {
        try {
            const geoLocation = await getGeoLocation(trip.destination);
            trip.latitude = geoLocation.results[0].geometry.lat;
            trip.longitude = geoLocation.results[0].geometry.lng;
            trip.country = geoLocation.results[0].components.country;
            trip.countryCode = geoLocation.results[0].components.country_code;
            trip.weatherForecast = await getWeatherForecast(trip.latitude, trip.longitude);
            trip.image = await getImageUrl(trip.destination, trip.country);
            updateModal(trip);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Unable to fetch data. Please try again.');
        }
    } else if (trip.startDate > trip.endDate) {
        alert('Return date should be after the start date');
    } else {
        alert('Please enter the destination, start date, and return date');
    }
};

// Function to handle saving trips
const handleSave = (e) => {
    e.preventDefault();
    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));
    window.location.href = 'saved-trips.html';
};

// Function to close the modal
const closeModal = () => {
    $('.mask').removeClass('active');
};

// Event listeners for modal and buttons
$('.close, .mask').on('click', closeModal);

if (searchBtn) {
    searchBtn.addEventListener('click', performAction);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
}

if (saveTripBtn) {
    saveTripBtn.addEventListener('click', handleSave);
}

if (createNewTripBtn) {
    createNewTripBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

if (deleteAllTripsBtn) {
    deleteAllTripsBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

$(document).keyup((e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
});

// Load and display saved trips
if (window.location.href.includes('saved-trips.html')) {
    const savedTrips = JSON.parse(window.localStorage.getItem('trips'));
    if (savedTrips) {
        savedTrips.forEach(trip => {
            displaySavedTrip(trip);
        });
    }
}
