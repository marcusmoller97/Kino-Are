import { expect, test } from '@jest/globals';
import request from 'supertest';

import initApp from '../../src/app.js';
const app = initApp();

test("Homepage", async () => {
    const response = await request(app)
        .get('/movies')
        .expect('Content-Type', /html/)
        .expect(200);
    expect(response.text).toMatch('Encanto');
    console.log(response.text)
});
