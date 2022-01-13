const regRouter = require("./routes/registration.route");

function init(app) {
  app.use("/reg", regRouter);
  app.use("/allCitizen", regRouter);
  app.use("/login", regRouter);
}

module.exports = {
  init,
};
