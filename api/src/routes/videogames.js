const { Videogame, Genre, Platform } = require('../db');
const { API_KEY } = process.env;
const router = require('express').Router();
const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  let { name } = req.query;
  if (name) {
    let apiVideogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
    let dbVideogames = Videogame.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }, include: [Genre, Platform]
    });
    Promise.all([apiVideogames, dbVideogames])
      .then(response => {
        let [apiResponse, dbResponse] = response;
        if (apiResponse.data.results.length !== 0 || dbResponse.length !== 0) {
          let info = dbResponse.concat(apiResponse.data.results)
          let sendInfo = info.map(v => ({
            id: v.id,
            img: v.background_image,
            name: v.name,
            genres: v.genres,
            rating: v.rating
          }))
          res.send(sendInfo);
        }
        else {
          res.send({ message: 'There are no games with that name' })
        }
      })
      .catch(e => console.error(e));
  }
  else {
    let apiVideogames = (pageNumber) => {
      return axios.get(`https://api.rawg.io/api/games?page=${pageNumber}&page_size=25&key=${API_KEY}`
      )
    };
    let dbVideogames = Videogame.findAll( {include: [Genre, Platform]});
    Promise.all([apiVideogames(1), apiVideogames(2), apiVideogames(3), apiVideogames(4), dbVideogames])
      .then(response => {
        let [apiRes1, apiRes2, apiRes3, apiRes4, dbRes] = response;
        let info = dbRes
          .concat(apiRes1.data.results, apiRes2.data.results, apiRes3.data.results, apiRes4.data.results)
        let sendInfo = info.map(v => ({
          id: v.id,
          img: v.background_image,
          name: v.name,
          genres: v.genres,
          rating: v.rating
        }))
        res.send(sendInfo)
      })
      .catch(e => console.error(e));
  }
});

module.exports = router;