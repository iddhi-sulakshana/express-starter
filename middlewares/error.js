import winston from "winston";
import "express-async-errors";

export default (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send(err.message);
};
