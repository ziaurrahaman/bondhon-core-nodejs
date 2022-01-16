const express = require("express");

const router = express.Router();
const marriageInfoService = require("../service/marriageInfo.service");
console.log("in route");
router.post("/", async (req, res, next) => {
  console.log("in route");
  const {
    gb_id,
    district_id,
    upazila_id,
    union_id,
    post_code,
    detail_address,
    fixed_on,
    marriage_date,
    reg_date,
    denmohor,
    paid_denmohor,
    muazzol,
    muazzil,

    mrg_id,
    whom,
    mrg_status,
    devorce_con,
    revoke_per,
    alimony_prv,
    per_no,
    per_date,
  } = req.body;

  const result = await marriageInfoService.createMarriageInfo(
    gb_id,
    district_id,
    upazila_id,
    union_id,
    post_code,
    detail_address,
    fixed_on,
    marriage_date,
    reg_date,
    denmohor,
    paid_denmohor,
    muazzol,
    muazzil,
    mrg_id,
    whom,
    mrg_status,
    devorce_con,
    revoke_per,
    alimony_prv,
    per_no,
    per_date
  );
  return res.status("201").json({
    message: "Data Inserted Successfully",
    data: result,
  });
});

module.exports = router;
