import mysql from "mysql2/promise";

export const db = mysql.createPool({
  // host: "211.193.53.90",
  host:"localhost",
  user: "root",
  password: "Pon741582!",
  database: "stock_db",
  port: 3306,
});
