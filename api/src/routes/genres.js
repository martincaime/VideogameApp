const { Genre } = require('../db');
const router = require('express').Router();

router.get('/', (req, res) => {
  Genre.findAll()
    .then(response => {
      res.send(response)
    })
    .catch(e => console.error(e))
})

module.exports = router;