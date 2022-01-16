const db = require("../../../../db");

async function createSpecialInfo(
  mrg_id,
  whom,
  mrg_status,
  devorce_con,
  revoke_per,
  alimony_prv,
  per_no,
  per_date
  // create_by ,
  // create_date
) {
  const queryText =
    "INSERT INTO marriage_special_info (  mrg_id, whom, mrg_status, devorce_con, revoke_per,alimony_prv,per_no,per_date,create_by,create_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id";

  const result = await db.query(queryText, [
    mrg_id,
    whom,
    mrg_status,
    devorce_con,
    revoke_per,
    alimony_prv,
    per_no,
    per_date,
    "admin",
    new Date(),
  ]);

  return result.rows[0];
}

module.exports = { createSpecialInfo };
