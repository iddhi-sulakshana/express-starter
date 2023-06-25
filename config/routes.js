import home from "../routes/home";
import users from "../routes/users";

export default (app) => {
  app.use("/api", home);
  app.use("/api/users", users);
};
