const express = require("express");

function setupRoutes(app) {
  // Serve static files from the public directory
  app.use(express.static(__dirname + "/public"));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

module.exports = { setupRoutes };
