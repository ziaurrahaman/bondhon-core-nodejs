const db = require("../../../../db");

async function createAddress(
  address_type,
  user_type,
  district_id,
  upazila_id,
  union_id,
  post_code,
  details_address
) {
  const queryText =
    "INSERT INTO address (address_type, user_type, district_id, upazila_id, union_id, post_code, details_address, create_by,create_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id";

  const result = await db.query(queryText, [
    address_type,
    user_type,
    district_id,
    upazila_id,
    union_id,
    post_code,
    details_address,
    "admin",
    new Date(),
  ]);
  console.log(result.rows[0]);
  return result.rows[0];
}

module.exports = { createAddress };
