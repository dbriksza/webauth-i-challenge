const express = require("express");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const configureMiddleware = require("./configure-middleware");

const apiRouter = require("./api-router.js");
const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const knexConnection = require("../data/dbConfig");

const server = express();

const sessionConfiguration = {
  name: "name",
  secret: process.env.COOKIE_SECRET || "is is secret? is it safe?",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: "user_sessions",
    sidfieldname: "id",
    createtable: true
  })
};

configureMiddleware(server);

server.use("/api", apiRouter);
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use(session(sessionConfiguration));

module.exports = server;
