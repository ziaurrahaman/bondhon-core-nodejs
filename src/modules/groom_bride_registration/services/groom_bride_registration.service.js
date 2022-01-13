const db = require("../../../../db");

async function createBrideOrGroom(
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
) {
  const queryText =
    "INSERT INTO grom_bride_info (nid, name, dob, mobile_no, email, relegion, father_name, father_nid, mother_name,mother_nid, created_by, created_at, updated_by, updated_at) values($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id";
  const result = await db.query(queryText, [
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
    "admin",
    new Date(),
    "admin",
    new Date(),
  ]);

  console.log(result.rows[0]);

  return result.rows[0];
}

module.exports = { createBrideOrGroom };
