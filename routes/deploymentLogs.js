const express = require("express");
const router = express.Router();

const {
  getDeploymentLogs,
  getDeploymentLogsDownload,
} = require("../controllers/deploymentLogsController");

router.route("/:id").get(getDeploymentLogs);
router.route("/:id/download").get(getDeploymentLogsDownload);

module.exports = router;
