// express is for servers
const express = require("express");
// MySQL is for data bases
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this starts the express server
app.listen(PORT, () => {
  console.log(`Server ONLINE listening to ${PORT}`);
});

// for when the user makes a GET request to the server but that isn't supported by the app
app.use((req, res) => {
  res.status(404).end();
});

// when the user connects to the server, they will see this message
app.get("/", (req, res) => {
  res.json({ message: "Monkey Time!" });
});

// connection to mysql DataBase to express server
const db = mysql.createConnection(
  // 127.0.0.1
  { 
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "election",
  },
  console.log("CONNECTED to 'election' DataBase")
);

db.connect((err) => {
  if (err) {
    throw err;
  }
});

// selects and shows the entire DataBase
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows, message: "SUCCESS" });
  });
});

// // selects and shows the row with id 1
// db.query(`SELECT * FROM candidates WHERE ID = 1`, (err, rows) => {
//   if (err) {
//     console.log(err, "id number not found");
//   }
//   console.log(rows);
// });

// // deletes candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, results) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });

// // creates a candidate
// const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)';

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, results) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// });
