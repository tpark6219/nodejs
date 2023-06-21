const express = require("express");
const router = express.Router();

const { getDeployments } = require("../controllers/deploymentsController");

router.route("/:id").get(getDeployments);

module.exports = router;
