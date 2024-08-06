const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const requestPost = require('./handleRequest');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname, 'dist')));

// Set up and spin up the server
const port = process.env.NODE_ENV === 'test' ? 8081 : process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`); // Callback to debug
});

/* Routes */
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/coordinates', requestPost.handleCoordinatesRequest);
app.post('/forecast', requestPost.handleWeatherForecastRequest);
app.post('/image', requestPost.handleImageRequest);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
