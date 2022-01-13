const express = require("express");

const router = express.Router();

const registrationService = require("../services/registration.service");
const { validateMemberArea } = require("../validator/registration.validator");
const {
  validateRequest,
} = require("../../../middlewares/validator-result.middle");

/*
 * Author Adnan
 * Create User API
 */

router.get("/user_type", async (req, res, next) => {
  const result = registrationService.getCitizenType();
});

router.post("/login", async (req, res, next) => {
  const { mobile_no, password } = req.body;
  console.log(mobile_no);
  const result = await registrationService.login(req.body);
  return res.status(200).json({
    message: "Successfully logged in",
    data: result,
  });
});

router.get("/", async (req, res, next) => {
  const result = await registrationService.getAllUsers();
  return res.status(200).json({
    message: "Successfull",
    data: result,
  });
});

router.get("/user_type/:user_type", async (req, res, next) => {
  const user_type = req.params.user_type;
  const result = await registrationService.getUserByUserType(user_type);
  return res.status(200).json({
    message: "Found",
    data: result,
  });
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await registrationService.getById(id);
  return res.status(200).json({
    message: "Successfull",
    data: result,
  });
});

router.get("/name", async (req, res, next) => {
  const result = await registrationService.getName();
  return res.status(200).json({
    message: "Successfull",
    data: result,
  });
});

router.post(
  "/",

  async (req, res) => {
    //console.log("Create User API")

    console.log(req.body);
    const {
      nid,
      name,
      dob,
      mobile_no,
      email,
      religion,
      user_type,
      verify,
      login_name,
      password,
      status,
    } = req.body;
    //const buff = await fsAsync.readFile(path.resolve(req.file.path));
    //console.log(await userService.uniqueCheckCreate('username', username));
    // const salt = await bcrypt.genSalt(10);
    // var hashPassword = await bcrypt.hash(password, salt);
    const result = await registrationService.createUser(
      nid,
      name,
      dob,
      mobile_no,
      email,
      religion,
      user_type,
      verify,
      login_name,
      password,
      status
    );

    return res.status(201).json({
      message: "User Created",
      data: result,
    });
    // await userImageService.createUserImage(newUserId, image, mimetype);
    // return res.status(201).json({
    //   id: newUserId,
    //   message: "User Created",
    // });
  }
);

module.exports = router;
