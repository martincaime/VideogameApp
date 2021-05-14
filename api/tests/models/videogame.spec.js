const { Videogame, conn } = require('../../src/db.js');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros', description: 'New Game' });
      });
    });
    describe('Description', () => {
      it('Should throw an error if description is null', (done) => {
        Videogame.create({name: 'Tincho Land'})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('Should work when its a valid description', () => {
        Videogame.create({ name: 'Super Mario Bros', description: 'New Game' });
      });
    });
  });
});
