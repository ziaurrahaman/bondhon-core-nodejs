const addressRouter = require("./routes/address.route");

function init(app) {
  app.use("/address", addressRouter);
}

module.exports = {
  init,
};
