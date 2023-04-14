const express = require("express");
const server = express();

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");

const mw = require("./auth/auth-middleware");
server.use(express.json()); //yeri önemli!!!!

server.use("/api/auth", authRouter);
server.use("/api/users", mw.restricted, usersRouter);
server.use("/api/tweets", mw.restricted, tweetsRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
