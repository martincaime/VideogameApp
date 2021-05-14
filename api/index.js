const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const axios = require('axios');
const { API_KEY } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then(response => {
        let genres = response.data.results.map(g => ({
          name: g.name
        }))
        Genre.bulkCreate(genres).then(() => console.log('Genres imported'))
      })
      .catch(e => console.error(e))
  });
});
