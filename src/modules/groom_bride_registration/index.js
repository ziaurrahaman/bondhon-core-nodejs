const bgRouter = require("./routes/groom_bride_registration.route");

function init(app) {
  app.use("/bride_groom_registration", bgRouter);
}

module.exports = {
  init,
};
