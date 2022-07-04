const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addMenu = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const requestJSON = event.body;
  const id = v4();
  const name = requestJSON.name;
  const adress = requestJSON.adress;
  const dish = requestJSON.dish;
  //const deliveryDate = requestJSON.deliveryDate;

  const newMenu = {
    id,
    name,
    adress,
    dish,
    //const deliveryDate
  };

  await dynamodb
    .put({
      TableName: "MenuTable",
      Item: newMenu,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newMenu),
  };
};

module.exports = {
  handler: middy(addMenu).use(httpJsonBodyParser()),
};
