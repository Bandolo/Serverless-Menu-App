const AWS = require("aws-sdk");

const deleteMenu = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const params = {
    TableName: "MenuTable",
    Key: { id },
  };

  await dynamodb
    .delete({
      TableName: "MenuTable",
      Key: { id },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Your Menu has been deleted",
    }),
  };
};

module.exports = {
  handler: deleteMenu,
};
