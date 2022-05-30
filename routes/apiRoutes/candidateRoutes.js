





const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
// a validation check function for user input for putting data in the DataBase
const inputCheck = require("../../utils/inputCheck");

// selects and shows the entire candidates
router.get("/candidates", (req, res) => {
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
router.get("/candidates/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.names
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id
                WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
      message: "success",
    });
  });
});

// deletes selected candidate
router.delete("/candidates/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
      return;
    } else if (!results.affectedRows) {
      res.json({ message: "Candidate NOT found, please try again" });
    } else {
      res.json({
        data: results.affectedRows,
        id: req.params.id,
        message: "deleted successfully",
      });
    }
  });
});

// creates a candidate
router.post("/candidates", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: body, message: "successfully added candidate" });
    return;
  });
});

// updates candidate
router.put("/candidates/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = "UPDATE candidates SET party_id = ? WHERE id = ?";
  const params = [req.body.party_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({ message: "Candidate not found" });
    } else {
      res.json({
        data: req.body,
        changes: result.affectedRows,
        message: "success!",
      });
    }
  });
});

module.exports = router;