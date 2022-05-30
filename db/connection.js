// MySQL is for data bases
const mysql = require("mysql2");
// connection to mysql DataBase to express server
const db = mysql.createConnection(
  // 127.0.0.1
  {
    host: "localhost",
    user: "root",
    password: "MidKnightSun",
    database: "election",
  },
  console.log("CONNECTED to 'election' DataBase")
);

module.exports = db;
