const express = require('express');
const http = require('http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { setupRoutes } = require('./routes.js');
const { setupSocket } = require('./socket.js');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
// creating a server from express
const server = http.createServer(app);
// mount/bind http server on socket.io
const io = new Server(server);

// Set up routes
setupRoutes(app);

// Set up socket.io
setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
