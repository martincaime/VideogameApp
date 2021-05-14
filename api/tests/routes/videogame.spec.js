const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true }));
  describe('GET /videogames', () => {
    it('Should get 200', () =>
      agent.get('/videogames').expect(200)
    ).timeout(4000);
  });
  describe('GET /videogame/:id', () => {
    it('Should get 200', () => {
      agent.get('/videogame/7868').expect(200)
    });
  });
  describe('POST /videogame', () => {
    it('Should get 200', () => {
      agent.post('/videogame').send({name: 'Tincho Land', description: 'New Game'})
    });
  });
  describe('GET /genres', () => {
    it ('Should get 200', () => {
      agent.get('/genres').expect(200)
    });
  });
});
