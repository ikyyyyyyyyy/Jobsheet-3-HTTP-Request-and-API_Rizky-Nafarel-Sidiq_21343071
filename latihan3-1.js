const request = require("postman-request");

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Jakarta.json?access_token=pk.eyJ1IjoicmVsbGV2aWlpIiwiYSI6ImNsbWlqNWp1ejJrNzczZ3M1YXN6czZ4cG8ifQ.-CdfUpk8u6A3eJsRSeel8w&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.error("Terjadi kesalahan saat mengambil data geocode:", error);
  } else if (response.body.features.length === 0) {
    console.error("Tempat tidak ditemukan");
  } else {
    const query = "Jakarta Pusat"; // Mengganti query dengan lokasi yang lebih spesifik
    const placeName = response.body.features[0].place_name;
    const placeType = response.body.features[0].place_type[0]; // Mengambil place_type pertama dalam array

    console.log("Data yang anda cari adalah:", query);
    console.log("Data yang ditemukan adalah:", placeName);
    console.log("Tipe lokasi adalah:", placeType);
  }
});
