const res = require("express/lib/response");
const db = require("../../../../db");

async function getCitizenType() {}

async function login(data) {
  const keys = Object.keys(data);
  console.log(keys);
  // const [key1, key2] = keys;
  const values = Object.values(data);
  // const [value1, value2] = values;

  let sql = "select mobile_no, password, user_type from citizen where ";
  let count = 1;
  // const finalSql = sql + `${key1}= $1 AND ${key2}= $2`;
  // console.log(finalSql);

  for (const [index, value] of keys.entries()) {
    if (index === 0) {
      sql = sql + ` ${value}=$${count} `;
      count = count + 1;
    } else {
      sql = sql + `  AND ${value}=$${count}`;
      count = count + 1;
    }
  }

  console.log(sql);
  // console.log("i am in login");
  // const queryText =
  //   "select mobile_no, password, user_type from citizen where mobile_no=$1 AND password=$2";

  const result = await await db.query(sql, values);

  return result.rows[0];
}

async function getUserByUserType(user_type) {
  const queryText = "SELECT * FROM citizen WHERE user_type =$1";
  const result = await db.query(queryText, [user_type]);
  return result.rows;
}

async function getAllUsers() {
  const queryText = "SELECT * FROM citizen";
  const result = await db.query(queryText);
  console.log(result.rows);
  return result.rows;
}

async function getById(id) {
  const queryText = "SELECT * FROM citizen WHERE id=$1";
  const result = await db.query(queryText, [id]);
  console.log(result.rows);
  return result.rows[0];
}

async function getName() {
  const queryText = "SELECT name FROM citizen";
  const result = await db.query(queryText);
  console.log(result.rows);
  return result.rows;
}

async function createUser(
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
) {
  const queryText =
    "INSERT INTO citizen (nid, name, dob, mobile_no, email, religion,user_type,verify, login_name,password, status,created_by) values($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12) RETURNING id";
  const result = await db.query(queryText, [
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
    "admin",
  ]);
  console.log(result.rows[0]);
  return result.rows[0];
}
module.exports = {
  createUser,
  getAllUsers,
  getById,
  getName,
  getUserByUserType,
  login,
};
