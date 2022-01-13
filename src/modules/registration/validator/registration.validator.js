const { body } = require("express-validator");

const validateMemberArea = [
  body("nid")
    .exists()
    .withMessage("Nid is not present in body")
    .isEmpty()
    .withMessage("Nid can not be null")
    .isInt()
    .withMessage("nid must be a number"),
];

module.exports = { validateMemberArea };
