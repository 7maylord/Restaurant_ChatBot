const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const dotenv = require("dotenv");

dotenv.config();


const sessionMiddleware = session({
  // configuration for session middleware
  store: new MemoryStore({checkPeriod: 86400000}),// prune expired entries every 24h
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
});

module.exports = sessionMiddleware;