const db = require("../../../../db");

async function createMarriageInfo(
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
) {
  const client = await db.pool.connect();
  console.log("client", client);
  try {
    console.log("in service");
    const rowsId = [];

    client.query("BEGIN");
    const queryText =
      "INSERT INTO marriage_info (gb_id, district_id, upazila_id, union_id, post_code, detail_address, fixed_on, marriage_date, reg_date, denmohor, paid_denmohor, muazzol, muazzil, create_by, create_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id";

    const result = await client.query(queryText, [
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
      "admin",
      new Date(),
    ]);
    rowsId.push(result.rows[0]);

    if (mrg_status === "devorcy") {
      const queryText =
        "INSERT INTO marriage_special_info (  mrg_id, whom, mrg_status, devorce_con, revoke_per,alimony_prv,per_no,per_date,create_by,create_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id";

      const result_spc = await client.query(queryText, [
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
      rowsId.push(result_spc.rows[0]);
      client.query("COMMIT");

      return rowsId;
    }
  } catch (error) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = { createMarriageInfo };
