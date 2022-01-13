const express = require("express");
const router = express.Router();
const address = require("../services/address.service");

router.post("/", async (req, res, next) => {
  const {
    address_type,
    user_type,
    district_id,
    upazila_id,
    union_id,
    post_code,
    details_address,
  } = req.body;

  const result = await address.createAddress(
    address_type,
    user_type,
    district_id,
    upazila_id,
    union_id,
    post_code,
    details_address
  );
  //   console.log();
  return res.status("201").json({
    message: "Address added",
    data: result,
  });
});

module.exports = router;
