const request = require("postman-request");

// Fungsi untuk mendapatkan data cuaca
const getWeatherData = (latitude, longitude, callback) => {
  const weatherstackURL = `http://api.weatherstack.com/current?access_key=85bfc23638b7e4030292b9f7827be17c&query=-0.22405302871794028, 100.63232110392518`;

  request({ url: weatherstackURL, json: true }, (error, response) => {
    if (error) {
      callback("Terjadi kesalahan saat mengambil data cuaca", null);
    } else if (response.body.error) {
      callback("Data cuaca tidak ditemukan", null);
    } else {
      const temperature = response.body.current.temperature;
      const precipitation = response.body.current.precip;

      callback(null, { temperature, precipitation });
    }
  });
};

// Panggil Mapbox API untuk mendapatkan data geocode
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Payakumbuh.json?access_token=pk.eyJ1IjoicmVsbGV2aWlpIiwiYSI6ImNsbWlqNWp1ejJrNzczZ3M1YXN6czZ4cG8ifQ.-CdfUpk8u6A3eJsRSeel8w&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.error("Terjadi kesalahan saat mengambil data geocode:", error);
  } else if (response.body.features.length === 0) {
    console.error("Tempat tidak ditemukan");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    const query = response.body.query;
    const placeName = response.body.features[0].place_name;
    const placeType = response.body.features[0].place_type[0]; // Mengambil place_type pertama dalam array

    console.log("Koordinat lokasi Anda:", latitude, longitude);
    console.log("Data yang Anda cari adalah:", query);
    console.log("Data yang ditemukan adalah:", placeName);
    console.log("Tipe lokasi:", placeType);

    // Panggil fungsi getWeatherData untuk mendapatkan data cuaca
    getWeatherData(latitude, longitude, (error, weatherData) => {
      if (error) {
        console.error(error);
      } else {
        console.log(
          `Saat ini suhu di lokasi ${placeName}: ${weatherData.temperature}°C`
        );
        console.log(`Kemungkinan terjadi hujan: ${weatherData.precipitation}`);
      }
    });
  }
});
