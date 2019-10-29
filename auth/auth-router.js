const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../routes/user-model.js');
const secrets = require('../config/secrets.js')

//post register
router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

//post login
router.post('/login', (req, res) => {
  // implement login
  let { username, password }= req.body;

  Users.findBy({ username })
  .first()
  .then( user => {
    if( user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });

    }else{
      res.status(401).json({ message: 'invalid credentials'});
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: `server 500 error ${err}`})
  })
});

//get logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    console.log(err)
    res.status(200).json({ message: 'goodbye'})
  })
})

//generate token @login
function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;