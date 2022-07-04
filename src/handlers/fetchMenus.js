const AWS = require("aws-sdk");

const fetchMenus = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let menus;

  try {
    const results = await dynamodb.scan({ TableName: "MenuTable" }).promise();
    menus = results.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(menus),
  };
};

module.exports = {
  handler: fetchMenus,
};
