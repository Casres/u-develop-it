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
  {
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'election',
  },
  console.log("CONNECTED to 'election' DataBase")
);

db.connect((err) => {
  if (err) {
    throw err;
  }
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});