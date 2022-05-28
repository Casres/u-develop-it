// express is for servers
const express = require('express');
const res = require('express/lib/response');
// MySQL is for data bases
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck')

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// when the user connects to the server, they will see this message
app.get("/", (req, res) => {
  res.json({ message: "Monkey Time!" });
});

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

// shows the error // error handling
db.connect((err) => {
  if (err) {
    throw err;
  }``
});

// selects and shows the entire DataBase
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.names
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows, message: "SUCCESS" });
  });
});

// selects and shows the row with id 1
app.get('/api/candidates/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.names
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id
              WHERE candidates.id = ?`;
  const params = [req.params.id]; 

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      data: rows,
      message: "success"
    });
  });
});

// deletes selected candidate
app.delete('/api/candidates/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.statusMessage(400).json({error: err.message});
      return;
    } else if (!results.affectedRows) {
      res.json({message: "Candidate NOT found, please try again"});
    } else {
      res.json({
        data: results.affectedRows,
        id: req.params.id,
        message: "deleted successfully"
      });
    }
  });
});

// creates a candidate
app.post('/api/candidates', ({body}, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({error: errors});
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({data:body, message: "successfully added candidate"});
    return;
  });
});

// this starts the express server
app.listen(PORT, () => {
  console.log(`Server ONLINE listening to ${PORT}`);
});

// for when the user makes a GET request to the server but that isn't supported by the app
app.use((req, res) => {
  res.status(404).end();
});