const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require('socket.io');
const { Server } = require("socket.io");
const sessionMiddleware = require('./src/middleware.js');
const { setupSocket } = require("./src/socket.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
// creating a server from express
const server = http.createServer(app);
// mount/bind http server on socket.io
const io = new Server(server);

app.use(sessionMiddleware);

// Share the session middleware with Socket.io
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

// Set up socket.io
setupSocket(io);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "/public")));

// Serve the index.html file on the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});



const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
