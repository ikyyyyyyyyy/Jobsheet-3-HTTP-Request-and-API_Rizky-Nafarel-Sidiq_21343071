const request = require("postman-request");
const urlCuaca =
  "http://api.weatherstack.com/current?access_key=85bfc23638b7e4030292b9f7827be17c&query=-0.8972724335596634,100.35079197649758&units=f";

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    console.error("Terjadi kesalahan:", error);
  } else {
    const temperature = response.body.current.temperature;
    const precip = response.body.current.precip;
    const weatherDescriptions = response.body.current.weather_descriptions;

    console.log(
      "Saat ini suhu diluar mencapai " +
        temperature +
        " derajat Fahrenheit. Kemungkinan terjadinya hujan adalah " +
        precip +
        "%. Cuaca saat ini: " +
        weatherDescriptions.join(", ") // Menggabungkan deskripsi cuaca menjadi satu teks.
    );
  }
});
