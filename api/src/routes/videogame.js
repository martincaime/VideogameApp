const { Videogame, Genre, Platform } = require('../db');
const { API_KEY } = process.env;
const router = require('express').Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

router.get('/:id', (req, res) => {
  let { id } = req.params;
  let numeric = /^[0-9]+$/
  if (numeric.test(id)) {
    axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then(response => {
        let videogame = {
          id: response.data.id,
          img: response.data.background_image,
          name: response.data.name,
          genres: response.data.genres,
          description: response.data.description,
          released: response.data.released,
          rating: response.data.rating,
          platforms: response.data.platforms
        }
        res.send(videogame);
      })
      .catch(e => console.error(e))
  }
  else {
    Videogame.findByPk(id, { include: [Genre, Platform] })
      .then(response => {
        res.send(response)
      })
      .catch(e => console.error(e))
  }
})

router.post('/', async (req, res) => {
  let { name, genres, description, released, rating, platforms } = req.body;
  let id = uuidv4();
  let videogame = { id, name, description, released, rating };
  let info = await Videogame.create(videogame);
  info.setGenres(genres);
  info.setPlatforms(platforms)
  res.send(info)
})

module.exports = router;