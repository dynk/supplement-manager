
const router = require('express').Router();

router.use('/v1', require('./v1'));
router.get('/info', info);

router.use(function(req, res, next){
  res.status(404);
  res.json({message: `${req.method} ${req.originalUrl} not found!`});
  next();
});

function info(req, res) {
  return res.json(`supplement server alive ${process.env.NODE_ENV}`);
}

module.exports = exports = router;
