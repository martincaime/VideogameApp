const { Router } = require('express');
const videogamesRouter = require('./videogames');
const videogameRouter = require('./videogame');
const genresRouter = require('./genres');

const router = Router();

router.use('/videogames', videogamesRouter)
router.use('/videogame', videogameRouter)
router.use('/genres', genresRouter)

module.exports = router;
