import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('Should Respond to "/image" with status code of 200', async () => {
    const response = await request.get('/images?name=dummy');
    expect(response.status).toBe(200);
  });

  it('Should respond to "/image" with status code of 400 if image name was not entered', async () => {
    const response = await request.get('/images');
    expect(response.status).toBe(400);
  });
});
