const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//setting up routes
const userRouter = require('../routes/user-router');
const authRouter = require('../auth/auth-router')

//routes
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

//testing server
server.get('/', (req, res) => {
    res.send('api is running')
})

module.exports = server;



