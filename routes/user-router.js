const router = require('express').Router();

const authenticate = require('../auth/authenticate-middleware.js')
const Users = require('./user-model.js');

router.get('/', authenticate, (req, res) => {
    Users.find()
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json( {message: `server 500 error` })
      });
    });  

module.exports = router;