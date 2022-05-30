// express is for servers
const express = require("express");
const router = express.Router();
// this is the ROOT of the apiRoutes folder
const apiRoutes = require("../apiRoutes");

// gets all the candidates PUT, CREATE, DELETE, and GET routes
router.use(require("./candidateRoutes"));

// gets all the party PUT, DELETE, CREATE, and GET routes
router.use(require("./partyRoutes"));

module.exports = router;
