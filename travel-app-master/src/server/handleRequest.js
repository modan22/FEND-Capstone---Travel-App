const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

async function handleWeatherForecastRequest(req, res, next) {
    const { latitude, longitude } = req.body;

    if (latitude && longitude) {
        const endpoint = `${process.env.DARKSKY_URL}/${process.env.DARKSKY_KEY}/${latitude},${longitude}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(200).json(jsonRes);
            } else {
                res.status(response.status).json({ error: 'Failed to fetch weather data' });
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request: Missing latitude or longitude' });
    }
}

async function handleCoordinatesRequest(req, res, next) {
    const { destination } = req.body;

    if (destination) {
        const endpoint = `${process.env.OPENCAGEDATA_URL}?q=${encodeURIComponent(destination)}&key=${process.env.OPENCAGEDATA_KEY}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(200).json(jsonRes);
            } else {
                res.status(response.status).json({ error: 'Failed to fetch coordinates' });
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request: Destination is required' });
    }
}

async function handleImageRequest(req, res, next) {
    const { destination, country } = req.body;

    if (destination || country) {
        let endpoint = `${process.env.PIXABAY_URL}?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(destination || country)}&image_type=photo`;
        try {
            let response = await fetch(endpoint);
            if (response.ok) {
                let jsonRes = await response.json();
                if (jsonRes.total === 0 && country) {
                    endpoint = `${process.env.PIXABAY_URL}?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(country)}&image_type=photo`;
                    response = await fetch(endpoint);
                    if (response.ok) {
                        jsonRes = await response.json();
                        res.status(200).json(jsonRes);
                    } else {
                        res.status(response.status).json({ error: 'Failed to fetch fallback images' });
                    }
                } else {
                    res.status(200).json(jsonRes);
                }
            } else {
                res.status(response.status).json({ error: 'Failed to fetch images' });
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request: Destination or country is required' });
    }
}

exports.handleWeatherForecastRequest = handleWeatherForecastRequest;
exports.handleCoordinatesRequest = handleCoordinatesRequest;
exports.handleImageRequest = handleImageRequest;
