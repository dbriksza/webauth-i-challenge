const express = require("express");
const configureMiddleware = require("./configure-middleware");

const apiRouter = require("./api-router.js");
const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");

const server = express();

configureMiddleware(server);

server.use("/api", apiRouter);
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

module.exports = server;
