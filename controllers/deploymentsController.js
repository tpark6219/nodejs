const asyncHandler = require("express-async-handler");
const endpointUrl = "https://backboard.railway.app/graphql/v2";
const axios = require("axios");

const getDeployments = asyncHandler(async (req, res) => {
  const query = `
  query project($input: DeploymentListInput!) {
    deployments (input: $input) {
      edges {
          node {
              id
      }
    }
    }
  }
`;
  const headers = {
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

  const variables = {
    input: {
      projectId: req.params.id,
    },
  };

  const deployments = await axios.post(
    endpointUrl,
    {
      query,
      variables,
    },
    {
      headers,
    }
  );

  res.status(200).json(deployments.data.data.deployments.edges);
});

module.exports = {
  getDeployments,
};
