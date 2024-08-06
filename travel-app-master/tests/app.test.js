const request = require('supertest');
const app = require('../src/server/index');

describe('Test root path', () => {
    beforeAll(() => {
        process.env.NODE_ENV = 'test';
    });

    test('It should respond to GET requests', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
});
