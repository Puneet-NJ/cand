const { Router } = require("express");
const { getCandidates } = require("./controllers/getcandidates");
const { createCandidates } = require("./controllers/createCandidates");

const router = Router();

router.post("/candidates", createCandidates);

router.get("/candidates", getCandidates);

module.exports = { router };
