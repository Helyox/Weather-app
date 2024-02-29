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

          document.querySelector('#location').innerText = city;
          checkWeather();
          weatherday();
          
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

let dataa;

async function checkWeather(){
  const response = await fetch(apiUrls + `lat=${latitude}` + `&lon=${longitude}` + `&appid=${apiKeyy}`);
  var dataa = await response.json();

  console.log(dataa);

  document.querySelector("#temperature").innerHTML = parseInt(dataa.main.temp) + "°C";
  document.querySelector("#detail").innerHTML = dataa.weather[0].main;

  if (dataa.weather[0].main == "Clouds") {
    // Créer un nouvel élément SVG avec les attributs nécessaires
    var newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("viewBox", "0 0 24 24");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("stroke", "currentColor");
    newSvg.setAttribute("stroke-width", "2");
    newSvg.setAttribute("stroke-linecap", "round");
    newSvg.setAttribute("stroke-linejoin", "round");
    newSvg.setAttribute("class", "tempartureicone black");

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttribute("d", "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z");

    // Ajouter le chemin au nouvel élément SVG
    newSvg.appendChild(newPath);
    var oldSvg = document.getElementById("sun");
    oldSvg.replaceWith(newSvg);
  }
  else if (dataa.weather[0].main == "Rain") {
    var newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("viewBox", "0 0 24 24");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("stroke", "currentColor");
    newSvg.setAttribute("stroke-width", "2");
    newSvg.setAttribute("stroke-linecap", "round");
    newSvg.setAttribute("stroke-linejoin", "round");
    newSvg.setAttribute("class", "tempartureicone black");

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttribute("d", "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");

    newSvg.appendChild(newPath);
    var oldSvg = document.getElementById("sun");
    oldSvg.replaceWith(newSvg);
  }

}

/// avoir les prevision méteo

const apiUrlss = "https://api.meteo-concept.com/api/forecast/daily?token=2c106a91659dbea4643708e392b7da6058588e0a2976e85a5495917a2cc66428";

async function weatherday(){
  const reps = await fetch(apiUrlss + `&latlng=${latitude},${longitude}`);
  var data = await reps.json();

  console.log(data);
  document.querySelector("#temp1").innerHTML = parseInt(data.forecast[1].tmax) + "°C";
  document.querySelector("#temp2").innerHTML = parseInt(data.forecast[2].tmax) + "°C";
  document.querySelector("#temp3").innerHTML = parseInt(data.forecast[3].tmax) + "°C";
  document.querySelector("#temp4").innerHTML = parseInt(data.forecast[4].tmax) + "°C";
  document.querySelector("#temp5").innerHTML = parseInt(data.forecast[5].tmax) + "°C";
  
  const conditionsMeteo = [
    'Clouds',       // Nuages
    'Clear',        // Dégagé
    'Sun',          // Soleil
    'Snow',         // Neige
    'Rain',         // Pluie
    'Thunderstorm', // Orage
    'Showers',      // Averses
    'Fog',          // Brouillard
    'Wind',         // Vent
    'Hail',         // Grêle
    'Partly Cloudy',// Partiellement Nuageux
    'Overcast'      // Ciel couvert
  ];

  
  console.log("day 1 : " + weatherss[data.forecast[1].weather - 1]);
  console.log(data.forecast[1].weather - 1);
  if (data.forecast[1].weather - 1 >= 10 && data.forecast[1].weather - 1 <= 15 || ( data.forecast[1].weather - 1 >= 40 && data.forecast[1].weather - 1 <= 48)){
    var newSvgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvgg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvgg.setAttribute("viewBox", "0 0 24 24");
    newSvgg.setAttribute("fill", "none");
    newSvgg.setAttribute("stroke", "currentColor");
    newSvgg.setAttribute("stroke-width", "2");
    newSvgg.setAttribute("stroke-linecap", "round");
    newSvgg.setAttribute("stroke-linejoin", "round");
    newSvgg.setAttribute("class", "icont black");

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPathh = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPathh.setAttribute("d", "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z");

    // Ajouter le chemin au nouvel élément SVG
    newSvgg.appendChild(newPathh);
    var oldSvgg = document.getElementById("icont1");
    oldSvgg.replaceWith(newSvgg);
  }
  
  console.log("day 2 : " + weatherss[data.forecast[2].weather - 1]);
  if (data.forecast[2].weather - 1 == 2 || data.forecast[2].weather - 1 == 3 || data.forecast[2].weather - 1 == 4){
    var newSvgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvgg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvgg.setAttribute("viewBox", "0 0 24 24");
    newSvgg.setAttribute("fill", "none");
    newSvgg.setAttribute("stroke", "currentColor");
    newSvgg.setAttribute("stroke-width", "2");
    newSvgg.setAttribute("stroke-linecap", "round");
    newSvgg.setAttribute("stroke-linejoin", "round");
    newSvgg.setAttribute("class", "icont black");

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPathh = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPathh.setAttribute("d", "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z");

    // Ajouter le chemin au nouvel élément SVG
    newSvgg.appendChild(newPathh);
    var oldSvgg = document.getElementById("icont2");
    oldSvgg.replaceWith(newSvgg);
  }

  console.log("day 3 : " + weatherss[data.forecast[3].weather - 1]);
  if (data.forecast[3].weather - 1 == 2 || data.forecast[3].weather - 1 == 3){
    var newSvgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvgg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvgg.setAttribute("viewBox", "0 0 24 24");
    newSvgg.setAttribute("fill", "none");
    newSvgg.setAttribute("stroke", "currentColor");
    newSvgg.setAttribute("stroke-width", "2");
    newSvgg.setAttribute("stroke-linecap", "round");
    newSvgg.setAttribute("stroke-linejoin", "round");
    newSvgg.setAttribute("class", "icont black");

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPathh = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPathh.setAttribute("d", "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z");

    // Ajouter le chemin au nouvel élément SVG
    newSvgg.appendChild(newPathh);
    var oldSvgg = document.getElementById("icont3");
    oldSvgg.replaceWith(newSvgg);
  }

  if (data.forecast[3].weather - 1 == 9 || data.forecast[3].weather - 1 == 8){
    var newSvgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvgg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvgg.setAttribute("viewBox", "0 0 24 24");
    newSvgg.setAttribute("fill", "none");
    newSvgg.setAttribute("stroke", "currentColor");
    newSvgg.setAttribute("stroke-width", "2");
    newSvgg.setAttribute("stroke-linecap", "round");
    newSvgg.setAttribute("stroke-linejoin", "round");
    newSvgg.setAttribute("class", "icont black");

    //PROBLEME le svg n'affiche pas la pluie //

    // Créer le chemin à l'intérieur du nouvel élément SVG
    var newPathh = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPathh.setAttribute("d", "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");

    // Ajouter le chemin au nouvel élément SVG
    newSvgg.appendChild(newPathh);
    var oldSvgg = document.getElementById("icont3");
    oldSvgg.replaceWith(newSvgg);
  }
};
