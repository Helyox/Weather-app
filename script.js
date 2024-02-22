// Location //
var latitude;
var longitude;

if ("geolocation" in navigator) {
    // La géolocalisation est prise en charge par le navigateur
    navigator.geolocation.getCurrentPosition(function (position) {
      // La position de l'utilisateur est disponible
       latitude = position.coords.latitude;
       longitude = position.coords.longitude;
  
      // Appel à l'API de géocodage inversé
      var apiKey = 'a6ff6d8556184dd6ab243329c0fbc889';
      var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Extraction du nom de la ville à partir de la réponse
          var city = data.results[0].components._normalized_city || data.results[0].components.city || 'unknown';
  
          console.log("Latitude : " + latitude + ", Longitude : " + longitude);
          console.log("Nom de la ville : " + city);

          var location = document.querySelector('#location');
          location.innerText = city;
          checkWeather();
          weatherday()
          // Vous pouvez utiliser les données de localisation comme vous le souhaitez ici
        })
        .catch(error => console.error("Erreur lors de la récupération du nom de la ville:", error));
    }, function (error) {
      // En cas d'erreur lors de la récupération de la localisation
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("L'utilisateur a refusé la demande de géolocalisation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("L'information de localisation n'est pas disponible.");
          break;
        case error.TIMEOUT:
          console.error("La demande de géolocalisation a expiré.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("Une erreur inconnue est survenue.");
          break;
      }
    });
  } else {
    // La géolocalisation n'est pas prise en charge par le navigateur
    console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
  }
  
// Date //

var dates = document.querySelector("#date")

var date = new Date();
var monthNumber = date.getMonth();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthName = monthNames[monthNumber];

// On passe au jour
var jourNumber = date.getDate();
var YearNumber = date.getFullYear();
console.log(YearNumber)
dates.innerText = jourNumber + " " + monthName +" "+YearNumber;

var currentday = new Date();
var daynb = currentday.getDay();
var daynames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayname = daynames[daynb];

// Attribution à chaque id son jour
document.querySelector("#day1").innerHTML = daynames[(daynb + 1) % 7];
document.querySelector("#day2").innerHTML = daynames[(daynb + 2) % 7];
document.querySelector("#day3").innerHTML = daynames[(daynb + 3) % 7];
document.querySelector("#day4").innerHTML = daynames[(daynb + 4) % 7];
document.querySelector("#day5").innerHTML = daynames[(daynb + 5) % 7];

var time = document.querySelector("#time")
// Obtention de l'heure, des minutes
var heures = date.getHours();
var minutes = date.getMinutes();
// pour ne pas avoir l'affichage suivant 17:5 et avoir 17:05//
if (minutes < 10){
    time.innerText = heures + ":" + "0" + minutes;
}
else {
    time.innerText = heures + ":" + minutes;
}

// Weather //

const apiKeyy = 'f90969c90ca7190b0727b06230c77b9f';
const apiUrls = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

async function checkWeather(){
  const response = await fetch(apiUrls + `lat=${latitude}` + `&lon=${longitude}` + `&appid=${apiKeyy}`);
  var data = await response.json();

  console.log(data);

  document.querySelector("#temperature").innerHTML = parseInt(data.main.temp) + "°C";
  document.querySelector("#detail").innerHTML = data.weather[0].main;

}

const apiUrlss = "https://api.open-meteo.com/v1/forecast?&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code"

async function weatherday(){
  const reps = await fetch(apiUrlss + `&latitude=${latitude}`+ `&longitude=${longitude}`);
  var data = await reps.json();

  console.log(data);
}
