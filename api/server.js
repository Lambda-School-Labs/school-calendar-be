//Require env variables
require("dotenv").config();

// Require
const express = require('express');
const cookieSession = require('cookie-session');
const apiRouter = require('./apiRouter');
const configureMiddleware = require('./configMiddleware');
const server = express();


//Passport Config
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

// Set cookie with 24hr session
server.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[process.env.SESSION_KEYS]
}))

//Initialize passport session
server.use(passport.initialize());
server.use(passport.session())


configureMiddleware(server);

server.use('/', apiRouter);

module.exports = server;



