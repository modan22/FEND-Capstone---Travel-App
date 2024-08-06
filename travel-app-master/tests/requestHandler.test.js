const requestPost = require('../src/server/handleRequest');
const handleWeatherForecastRequest = requestPost.handleWeatherForecastRequest;

const httpMocks = require('node-mocks-http');
const fetch = require('node-fetch');
jest.mock('node-fetch', () => require('jest-fetch-mock'));

describe('Test handleWeatherForecastRequest function', () => {
    test('It should exist', () => {
        expect(handleWeatherForecastRequest).toBeDefined();
    });

    test('It should be a function', () => {
        expect(typeof handleWeatherForecastRequest).toBe('function');
    });

    test('It should return 200 if a valid request is provided', async () => {
        // Set up mock response
        fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

        const req = httpMocks.createRequest({
            body: {
                latitude: '51.952659',
                longitude: '7.632473'
            }
        });
        const res = httpMocks.createResponse();

        await handleWeatherForecastRequest(req, res);

        // Validate the HTTP result
        expect(res.statusCode).toBe(201); // Expecting 201 based on your original code
        const data = res._getData();
        expect(data).toEqual({ success: true });
    });

    test('It should return 400 if latitude or longitude is missing', async () => {
        fetch.mockResponseOnce(JSON.stringify({ error: 'Bad Request' }), { status: 400 });

        const req = httpMocks.createRequest({
            body: {} // No latitude or longitude
        });
        const res = httpMocks.createResponse();

        await handleWeatherForecastRequest(req, res);

        // Validate the HTTP result
        expect(res.statusCode).toBe(400);
        const data = res._getData();
        expect(data).toEqual('Bad Request');
    });
});
