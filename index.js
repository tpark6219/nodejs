const PORT = 3000;
const express = require("express");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/deployments", require("./routes/deployments"));
app.use("/api/deploymentLogs", require("./routes/deploymentLogs"));
app.get("/", (_, res) => {
  res.send(
    "<div>Endpoints: <br> 1. /api/deployments/{project-id} <br> 2. /api/deploymentLogs/{deployment-id} </div>"
  );
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
