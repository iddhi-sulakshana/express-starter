// Description: This file is the entry point of the application.
console.clear();

// initialize environment variables and set defaults if not set
import env_config from "./config/env.js";
env_config();

import express from "express";
import logger from "./config/logger.js";
import middlewares from "./config/middlewares.js";
import routes from "./config/routes.js";

// initialize express app
const app = express();
const winston = logger();

// initialize express middleware
middlewares(app);

// initialize routes
routes(app);
const server = app.listen(process.env.port || 3000, () => {
  winston.info(`Listening on port: ${process.env.PORT || 3000}`);
  winston.info(`webpage: http://localhost:${process.env.PORT || 3000}`);
  winston.info(`api : http://localhost:${process.env.PORT || 3000}/api`);
});

export default server;
