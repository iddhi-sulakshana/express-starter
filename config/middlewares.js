import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import error from "../middlewares/error";

export default (app) => {
  // error handle middleware
  app.use(error);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // serve public folder
  app.use(express.static("public"));
  // log requests
  app.use(morgan("tiny"));
  // cross-origin resource sharing
  app.use(cors());
  // express fileupload middleware
  app.use(fileUpload());
};
