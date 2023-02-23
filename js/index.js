let str;
let geocoder = new google.maps.Geocoder();

function initMap() {
  const myLatlng = { lat: 35, lng: 139 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get weather!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();

    let lat = mapsMouseEvent.latLng.lat();
    let lng = mapsMouseEvent.latLng.lng();
    geocoder
      .geocode({ location: mapsMouseEvent.latLng })
      .then((response) => {
        if (response.results[0]) {
          address = response.results[0].formatted_address;
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));

    let xhr = new XMLHttpRequest();

    //weather forecast mode on
    if (document.getElementById("flexSwitchCheckDefault").checked) {
      xhr.open(
        "GET",
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lng +
          "&appid=★★★&lang=ja&units=metric"
      );
      xhr.send();
      xhr.onload = () => {
        const ogj = JSON.parse(xhr.response);

        str =
          address +
          "<br>" +
          "天気：" +
          ogj.list[0].weather[0].main +
          "→" +
          ogj.list[2].weather[0].main +
          "→" +
          ogj.list[4].weather[0].main +
          "→" +
          ogj.list[6].weather[0].main +
          "→" +
          ogj.list[8].weather[0].main +
          "<br>" +
          "天気詳細：" +
          ogj.list[0].weather[0].description +
          "→" +
          ogj.list[2].weather[0].description +
          "→" +
          ogj.list[4].weather[0].description +
          "→" +
          ogj.list[6].weather[0].description +
          "→" +
          ogj.list[8].weather[0].description +
          "<br>" +
          "気温：" +
          ogj.list[0].main.temp +
          "℃" +
          "→" +
          ogj.list[2].main.temp +
          "℃" +
          "→" +
          ogj.list[4].main.temp +
          "℃" +
          "→" +
          ogj.list[6].main.temp +
          "℃" +
          "→" +
          ogj.list[8].main.temp +
          "℃" +
          "<br>" +
          "湿度：" +
          ogj.list[0].main.humidity +
          "%" +
          "→" +
          ogj.list[2].main.humidity +
          "%" +
          "→" +
          ogj.list[4].main.humidity +
          "%" +
          "→" +
          ogj.list[6].main.humidity +
          "%" +
          "→" +
          ogj.list[8].main.humidity +
          "%" +
          "<br>" +
          "降水確率：" +
          ogj.list[0].pop * 100 +
          "%" +
          "→" +
          ogj.list[2].pop * 100 +
          "%" +
          "→" +
          ogj.list[4].pop * 100 +
          "%" +
          "→" +
          ogj.list[6].pop * 100 +
          "%" +
          "→" +
          ogj.list[8].pop * 100 +
          "%" +
          "<br>" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.list[0].weather[0].icon +
          ".png >" +
          "→" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.list[2].weather[0].icon +
          ".png >" +
          "→" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.list[4].weather[0].icon +
          ".png >" +
          "→" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.list[6].weather[0].icon +
          ".png >" +
          "→" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.list[8].weather[0].icon +
          ".png >";

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(str);
        infoWindow.open(map);
        map.panTo(mapsMouseEvent.latLng);
      };
    }
    //weather forecast mode off
    else {
      xhr.open(
        "GET",
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lng +
          "&appid=★★★&lang=ja&units=metric"
      );
      xhr.send();
      xhr.onload = () => {
        const ogj = JSON.parse(xhr.response);

        str =
          address +
          "<br>" +
          "天気：" +
          ogj.weather[0].main +
          "<br>" +
          "天気詳細：" +
          ogj.weather[0].description +
          "<br>" +
          "気温：" +
          ogj.main.temp +
          "℃" +
          "<br>" +
          "湿度：" +
          ogj.main.humidity +
          "%" +
          "<br>" +
          "<img src=http://openweathermap.org/img/w/" +
          ogj.weather[0].icon +
          ".png >";

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(str);
        infoWindow.open(map);
        map.panTo(mapsMouseEvent.latLng);
      };
    }
  });
}

window.initMap = initMap();
