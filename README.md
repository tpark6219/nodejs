# Solution
A minimal Node.js web application to stream logs of a Railway deployment to a text file and download.

### Overview
This is a very simple NodeJS application that has two endpoints using express which simplifies grabbing logs from Railway deployments. It utilizes the 
Railway GraphQL endpoint ```https://backboard.railway.app/graphql/v2```


#### Endpoints
1. ```/api/deployments/{project-id}```
   This endpoint is to get all deploymentIds from a specific project ID to use for the second endpoint. You can get the project ID from the URL
   when selecting a specific project in the format ```https://railway.app/project/1d32f789-cbc1-446e-a4e6-29ce2eb6e956```
2. ```/api/deploymentLogs/{deployment-id}```
   This endpoint is to get the logs for that specific deployment ID which gives the timestamp, message and severity of each log. 
   You can also add ```/download``` to this endpoint or click the link to download the text file.

#### Code Explanation
There are two route files ```deploymentLogs.js``` and ```deployments.js``` that handles the routing and is defined in the ```index.js``` file.
The controllers files ```deploymentsController.js ``` and ```deploymentLogsController.js``` handle the GET requests and calls the GraphQL query on Railways endpoint to gather the data and write to a text file. 

#### How to deploy in your own Railway Account

1. Fork this repository (github.com/tpark6219/nodejs) to your own repository.
2. Go to Railway.app and create a new project
3. Select on ```Deploy from GitHub repo``` and select on the /nodejs repository
4. In your CLI use command ```railway up``` to deploy the application and you're ready to go! Here is some documentation to help with CLI commands: https://docs.railway.app/reference/cli-api

![steps](https://github.com/tpark6219/nodejs/assets/7156896/25cd6f29-e739-4794-aa67-8c6bbcb2c6c8)






