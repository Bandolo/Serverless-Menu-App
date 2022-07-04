const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateMenu = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { dish } = event.body;
  const { id } = event.pathParameters;

  await dynamodb
    .update({
      TableName: "MenuTable",
      Key: { id },
      UpdateExpression: "set dish = :dish",
      ExpressionAttributeValues: {
        ":dish": dish,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Your Menu has been updated successfully",
    }),
  };
};

module.exports = {
  handler: middy(updateMenu).use(httpJsonBodyParser()),
};
