const asyncHandler = require("express-async-handler");
const endpointUrl = "https://backboard.railway.app/graphql/v2";
const axios = require("axios");
const fs = require("fs");

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const getDeploymentLogsDownload = asyncHandler(async (req, res) => {
  const query = `
    query project {
        deploymentLogs(deploymentId: "${req.params.id}") {
            message
            severity  
            timestamp
        }
    }
`;

  const response = await axios.post(
    endpointUrl,
    {
      query,
    },
    {
      headers,
    }
  );

  const content = response.data.data.deploymentLogs.map(
    (log) => `${log.timestamp}: ${log.message}-${log.severity}`
  );
  const fileContent = content.join("\n");

  fs.writeFile(`${req.params.id}.txt`, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${req.params.id}.txt`
      );
      res.setHeader("Content-Type", "text/plain");

      // Read the file and send it as the response
      fs.readFile(`${req.params.id}.txt`, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error reading file");
        } else {
          res.end(fileContent);
        }
      });
    }
  });
});

const getDeploymentLogs = asyncHandler(async (req, res) => {
  const query = `
    query project {
        deploymentLogs(deploymentId: "${req.params.id}") {
            message
            severity  
            timestamp
        }
    }
`;

  const deploymentLogs = await axios.post(
    endpointUrl,
    {
      query,
    },
    {
      headers,
    }
  );

  const content = deploymentLogs.data.data.deploymentLogs.map(
    (log) => `${log.timestamp}: ${log.message}-${log.severity}`
  );
  const fileContent = content.join("\n");
  res.send(
    `<div> Click <a href="./${req.params.id}/download">Here</a> or add "/download" to the URL to download the text file: <br><br> ${fileContent} </div>`
  );
});

module.exports = {
  getDeploymentLogs,
  getDeploymentLogsDownload,
};
