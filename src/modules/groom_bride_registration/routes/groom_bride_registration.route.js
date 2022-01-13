const express = require("express");
const router = express.Router();
const groomBrideRegitrationService = require("../services/groom_bride_registration.service");

router.post("/", async (req, res, next) => {
  const {
    nid,
    name,
    dob,
    mobile_no,
    email,
    relegion,
    father_name,
    father_nid,
    mother_name,
    mother_nid,
  } = req.body;

  const result = groomBrideRegitrationService.createBrideOrGroom(
    nid,
    name,
    dob,
    mobile_no,
    email,
    relegion,
    father_name,
    father_nid,
    mother_name,
    mother_nid
  );

  return res.status(201).json({
    message: "Groom Or Bride Created",
    data: result,
  });
});
module.exports = router;
