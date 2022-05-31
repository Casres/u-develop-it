const express = require("express");
const router = express.Router;
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");


// this POSTs votes to the votes table
router.post("/votes", ({body}, res) => {
    const errors = inputCheck(body, "voter_id", "candidate_id");
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO votes (voter_id, candidate_id,) VALUES (?,?)`;
    const params = [body.voter_id, body.candidate_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            data: body,
            changes: result.affectedRows,
            message: "Thank you for your vote!"
        });
    });
});

module.exports = router;