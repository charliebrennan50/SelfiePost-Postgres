var mymap = L.map('mapid').setView([51.505, -0.09], 13);
      
//Code to setup map tiles useing mapbox
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hhcmxpZWJyZW5uYW41MCIsImEiOiJja2VnejBjMWswbGoyMzBxcTFhYW00ZmkwIn0.UN50EPaU0pu2JV131L422g'
      }).addTo(mymap);

document.getElementById('myBtn').addEventListener("click", function () {
  if ('geolocation' in navigator) {
    console.log("available");
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(4);
      document.getElementById('longitude').textContent = long.toFixed(4);
      let mood = document.getElementById('mood').value;
      
      const data = {
        lat,
        long,
        mood
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch('/api', options).then(response => {
        console.log(response);
      });

      // use lat/long to update position on main page map
      updateMap(lat, long);
      
    });
  } else {
    console.log("not available");
  }
});

function updateMap(lat,long) {

  //Code to setup map tiles useing mapbox
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hhcmxpZWJyZW5uYW41MCIsImEiOiJja2VnejBjMWswbGoyMzBxcTFhYW00ZmkwIn0.UN50EPaU0pu2JV131L422g'
  }).addTo(mymap);

  // center view on current lat/long with zoom factor of 8
  mymap.setView(new L.LatLng(lat, long), 8);

  // assign popup text to marker to display when clicked
  let popupText = `Latutude: ${lat.toFixed(4)}, Longitude: ${long.toFixed(4)}`
  var marker = L.marker([lat, long]).addTo(mymap).bindPopup(popupText);
}