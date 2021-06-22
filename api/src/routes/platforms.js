const { Platform } = require('../db');
const router = require('express').Router();

router.get('/', (req, res) => {
  Platform.findAll()
    .then(response => {
      res.send(response)
    })
    .catch(e => console.error(e))
})

module.exports = router;