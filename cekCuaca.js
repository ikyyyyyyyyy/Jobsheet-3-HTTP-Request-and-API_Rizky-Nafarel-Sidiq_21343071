const request = require("postman-request");
const urlCuaca =
  "http://api.weatherstack.com/current?access_key=85bfc23638b7e4030292b9f7827be17c&query=-0.8972724335596634, 100.35079197649758&units=f";

request({ url: urlCuaca, json: true }, (error, response) => {
  console.log(
    "Saat ini suhu diluar mencapai " +
      response.body.current.temperature +
      " derajat Fahrenheit. Kemungkinan terjadinya hujan adalah " +
      response.body.current.precip +
      "%"
  );
});
