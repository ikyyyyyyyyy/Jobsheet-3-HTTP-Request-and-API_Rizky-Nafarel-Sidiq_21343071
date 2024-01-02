const request = require("postman-request");
const url =
  "http://api.weatherstack.com/current?access_key=85bfc23638b7e4030292b9f7827be17c&query=-0.8972724335596634, 100.35079197649758";
request({ url: url }, (error, response) => {
  //   console.log(response);
  const data = JSON.parse(response.body);
  //   console.log(data);
  //   console.log(data.current);
  console.log(data.current.temperature);
});
