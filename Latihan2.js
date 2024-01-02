const request = require("postman-request");

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Bali.json?access_token=pk.eyJ1IjoicmVsbGV2aWlpIiwiYSI6ImNsbWlqNWp1ejJrNzczZ3M1YXN6czZ4cG8ifQ.-CdfUpk8u6A3eJsRSeel8w&limit=3";

const urlCuaca =
  "http://api.weatherstack.com/current?access_key=85bfc23638b7e4030292b9f7827be17c&query=-8.6524973 115.2191175&units=m";

// Permintaan pertama untuk geocode
request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.error("Terjadi kesalahan saat mengambil data geocode:", error);
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log("Koordinat Bali:", latitude, longitude);

    // Permintaan kedua untuk cuaca menggunakan koordinat yang telah ditemukan
    request({ url: urlCuaca, json: true }, (error, response) => {
      if (error) {
        console.error("Terjadi kesalahan saat mengambil data cuaca:", error);
      } else {
        const temperature = response.body.current.temperature;
        const precip = response.body.current.precip;
        const weatherDescriptions = response.body.current.weather_descriptions;

        console.log(
          "Saat ini suhu diluar mencapai " +
            temperature +
            " derajat Celcius. Kemungkinan terjadinya hujan adalah " +
            precip +
            "%. Cuaca saat ini: " +
            weatherDescriptions.join(", ") // Menggabungkan deskripsi cuaca menjadi satu teks.
        );
      }
    });
  }
});
