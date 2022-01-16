const marriage_info_route = require("./routes/marriageInfo.route");

function init(app) {
  console.log("in index");
  app.use("/marriage_info", marriage_info_route);
}

module.exports = {
  init,
};
