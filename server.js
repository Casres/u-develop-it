// express is for servers
const express = require("express");
// connection to the database
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

// PORT info
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// THIS takes this prefix and moves it to the index.js file 
// and plugs the "/api" into the 
// front of all the routes
app.use('/api', apiRoutes);

// Default response for any other request that are not found
app.use((req, res) => {
  res.status(404).end();
});

// when the user connects to the server, they will see this message ON the localhost
app.get("/", (req, res) => {
  res.json({ message: "Monkey Time!" });
});

db.connect((err) => {
  if (err) throw err;
  console.log(`DataBase CONNECTED`);
  app.listen(PORT, () => {
    console.log(`Server ONLINE, listening to ${PORT}`);
  });
});
