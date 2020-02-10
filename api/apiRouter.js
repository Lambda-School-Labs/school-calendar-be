require("dotenv").config();
const router = require('express').Router();

const authRouter = require('../routes/auth');
const profileRouter = require('../routes/profile')

router.use('/api/auth', authRouter);
router.use('/api/user', profileRouter)

//GET endpoint for checking app
router.get("/", (req, res) => {
    res.send({ api: "Ok", dbenv: process.env.DB_ENV });
  });

module.exports = router;