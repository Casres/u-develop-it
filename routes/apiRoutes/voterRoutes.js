const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// gets all the voters
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
      message: "success",
    });
  });
});

// gets voter by id
router.get("/voters/:id", (req, res) => {
  const sql = "SELECT * FROM voters WHERE id = ?";
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

// creates a voter
router.post("/voters", ({ body }, res) => {
  // input validation
  const errors = inputCheck(body, "first_name", "last_name", "email");
  if (error) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: body,
      message: "Voter added to the DataBase",
    });
  });
});

// edits or updates a voter
router.put("/voters/:id", (req, res) => {
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (!result.affectedRows) {
      res.json({ message: "Voter not found" });
    } else {
      res.json({
        data: req.body,
        changes: result.affectedRows,
        message: "Success"
      });
    }
  });
});

// this deletes voters by id as well
router.delete("/voters/:id", (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({error: res.message});
        } else if (!result.affectedRows) {
            res.json({message: "Voter you wish to delete is not found"});
        } else {
            res.json({ 
                changes: result.affectedRows,
                id: req.params.id,
                message: "Deleted"
            });
        }
    });
});

// sends in a vote

module.exports = router;
