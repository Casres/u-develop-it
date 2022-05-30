





const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// returns all the parties
router.get("/parties", (req, res) => {
  const sql = `SELECT * FROM parties;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows, message: "success" });
  });
});

// gets the the party by id
router.get("/parties/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?;`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else if (rows.length < 1) {
      res.status(404).json({ message: "id not found" });
      return;
    }
    res.json({ data: rows, message: "success" });
  });
});

router.delete(`/parties/:id`, (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({ messages: "party not found" });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// if the api input doesn't exist or is found, like localhost:3001/blah-blah-blah, then it'll show this
router.get("*", (req, res) => {
  res.status(404).send(` 404 error code, api not found`);
});

module.exports = router;