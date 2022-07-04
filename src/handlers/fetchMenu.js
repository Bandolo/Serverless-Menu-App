const AWS = require("aws-sdk");

const fetchMenu = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let menu;

  try {
    const result = await dynamodb
      .get({
        TableName: "MenuTable",
        Key: { id },
      })
      .promise();
    menu = result.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(menu),
  };
};

module.exports = {
  handler: fetchMenu,
};
