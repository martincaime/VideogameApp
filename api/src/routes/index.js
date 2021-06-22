const { Router } = require('express');
const videogamesRouter = require('./videogames');
const videogameRouter = require('./videogame');
const genresRouter = require('./genres');
const platformsRouter = require('./platforms');

const router = Router();

router.use('/videogames', videogamesRouter)
router.use('/videogame', videogameRouter)
router.use('/genres', genresRouter)
router.use('/platforms', platformsRouter)


module.exports = router;
