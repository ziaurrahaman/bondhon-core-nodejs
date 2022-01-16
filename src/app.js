const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const regModule = require("./modules/registration");
const bgModule = require("./modules/groom_bride_registration");
const addressModule = require("./modules/address");
const marriageInfoModule = require("./modules/marriage_info");
// module import

const errorHandler = require("./middlewares/error-handler.middle");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

process.on("uncaughtException", (err) => {
  console.error("[ERROR] Uncaught Exception : ", err.message);
  process.exit(1);
});

regModule.init(app);
bgModule.init(app);
addressModule.init(app);
marriageInfoModule.init(app);
app.use(errorHandler);

app.listen(8081, () => console.log("Server started at port 8081"));
