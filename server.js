const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { setupSocket } = require("./src/socket.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
// creating a server from express
const server = http.createServer(app);
// mount/bind http server on socket.io
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "/src/public")));

// Serve the index.html file on the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/public/index.html"));
});

// Set up socket.io
setupSocket(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
