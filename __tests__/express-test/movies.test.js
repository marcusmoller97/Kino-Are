import { createRequire } from 'node:module';
import { jest } from '@jest/globals';
import request from 'supertest';

import { renderMoviesPage } from '../../lib/renderPage.js';
import { loadMovie } from '../../src/apiMovies.js';
import initApp from '../../app.js';
import test from 'node:test';

/* // Create mock version of loadMovies
const mockLoadMovies = jest.fn;

jest.spyOn(require('../../src/apiMovies.js'), 'loadMovie').mockImplementation(mockLoadMovies);
 */

/* beforeAll(async () => {
    app = await initApp();
    server = app.listen();
}); */

/* afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
}); 

*/
/* afterAll(() => {
    server.close();
}); */
let app;

beforeAll(async () => {
    // Initialisera appen
    app = await initApp();
    server = app.listen(); // Starta servern
});

afterAll(() => {
    server.close(); // Stäng servern för att förhindra öppna handles
});

test('Home page shows list of movies', async () => {
    const response = await request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200);
    
    console.log(response.text); 
    
    expect(response.text).toMatch(/<html>/);
});