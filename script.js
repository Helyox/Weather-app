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
  // mettre icon pr le soir pour le soleil
  let timestampSunset = dataa.sys.sunset;
  let dateSunset = new Date(timestampSunset * 1000); 

  let options = { timeZone: 'UTC', hour12: false };
  let heureSunset = dateSunset.toLocaleTimeString('fr-FR', options);

  if (dataa.weather[0].main == "Clear" && heures >= heureSunset){
    console.log("test")
  }

  if (dataa.weather[0].main == "Clouds") {
    var sunIcon = document.getElementById("sun");
    sunIcon.classList.remove("wi-day-sunny");
    sunIcon.classList.add("wi-cloud");
    sunIcon.classList.add("black");
    sunIcon.classList.add("lever");
  }
  if (dataa.weather[0].main == "Snow") {
    var sunIcon = document.getElementById("sun");
    sunIcon.classList.remove("wi-day-sunny");
    sunIcon.classList.add("wi-snow");
    sunIcon.classList.add("black");
    sunIcon.classList.add("lever");
  }
  else if (dataa.weather[0].main == "Rain") {
    var sunIcon = document.getElementById("sun");
    sunIcon.classList.remove("wi-day-sunny");
    sunIcon.classList.add("wi-rain");
    sunIcon.classList.add("black");
    sunIcon.classList.add("lever");
}
};

// avoir les prevision méteo
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
  
  //Jour +1
  console.log("day 1 : " + parseInt(data.forecast[1].tmax) + "°C " + data.forecast[1].weather);
  var weatherCode1 = parseInt(data.forecast[1].weather);
// La pluie
if ((weatherCode1 >= 10 && weatherCode1 <= 15) || (weatherCode1 >= 40 && weatherCode1 <= 48) || (weatherCode1 >= 70 && weatherCode1 <= 78) || (weatherCode1 >= 140 && weatherCode1 <= 212)) {
    var Icon = document.getElementById("icont1");
    Icon.classList.remove("wi-day-sunny");
    Icon.classList.add("wi-rain");
    Icon.classList.add("black");
};

//Orages
if (weatherCode1 >= 100 && weatherCode1 <= 138) {
  var Icon = document.getElementById("icont1");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-day-storm-showers");
  Icon.classList.add("black");
};
//Ciel voilé
if (weatherCode1 == 2 ) {
  var Icon = document.getElementById("icont1");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-day-cloudy");
  Icon.classList.add("black");
};
// Nuages
if ((weatherCode1 == 1) || (weatherCode1 >= 3 && weatherCode1 <= 7)) {
  var Icon = document.getElementById("icont1");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-cloud");
  Icon.classList.add("black");
};
//Neiges
if ((weatherCode1 >= 20 && weatherCode1 <= 22) || (weatherCode1 >= 60 && weatherCode1 <= 68 || (weatherCode1 >= 220 && weatherCode1 <= 222)) ) {
  var Icon = document.getElementById("icont1");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-snow");
  Icon.classList.add("black");
};

// bien mettre mes if avec les chiffres qu'ils faut, je le fait pour le jour 1 et après juste je copie colle
console.log("day 2 : " + parseInt(data.forecast[2].tmax) + "°C " + data.forecast[2].weather);
  // La pluie
  var weatherCode2 = parseInt(data.forecast[2].weather);
if ((weatherCode2 >= 10 && weatherCode2 <= 15) || (weatherCode2 >= 40 && weatherCode2 <= 48) || (weatherCode2 >= 70 && weatherCode2 <= 78) || (weatherCode2 >= 140 && weatherCode2 <= 212)) {
  var Icon = document.getElementById("icont2");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-rain");
  Icon.classList.add("black");
};

//Orages
if (weatherCode2 >= 100 && weatherCode2 <= 138) {
var Icon = document.getElementById("icont2");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-storm-showers");
Icon.classList.add("black");
};
//Ciel voilé
if (weatherCode2 == 2 ) {
var Icon = document.getElementById("icont2");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-cloudy");
Icon.classList.add("black");
};
// Nuages
if ((weatherCode2 == 1) || (weatherCode2 >= 3 && weatherCode2 <= 7)) {
var Icon = document.getElementById("icont2");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-cloud");
Icon.classList.add("black");
};
//Neiges
if ((weatherCode2 >= 20 && weatherCode2 <= 22) || (weatherCode2 >= 60 && weatherCode2 <= 68) || (weatherCode2 >= 220 && weatherCode2 <= 222))  {
var Icon = document.getElementById("icont2");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-snow");
Icon.classList.add("black");
}

console.log("day 3 : " + parseInt(data.forecast[3].tmax) + "°C " + data.forecast[3].weather);
  // La pluie
  var weatherCode3 = parseInt(data.forecast[3].weather);
if ((weatherCode3 >= 10 && weatherCode3 <= 15) || (weatherCode3 >= 40 && weatherCode3 <= 48) || (weatherCode3 >= 70 && weatherCode3 <= 78) || (weatherCode3 >= 140 && weatherCode3 <= 212)) {
  var Icon = document.getElementById("icont3");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-rain");
  Icon.classList.add("black");
};

//Orages
if (weatherCode3 >= 100 && weatherCode3 <= 138) {
var Icon = document.getElementById("icont3");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-storm-showers");
Icon.classList.add("black");
};
//Ciel voilé
if (weatherCode3 == 2 ) {
var Icon = document.getElementById("icont3");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-cloudy");
Icon.classList.add("black");
};
// Nuages
if ((weatherCode3 == 1) || (weatherCode3 >= 3 && weatherCode3 <= 7)) {
var Icon = document.getElementById("icont3");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-cloud");
Icon.classList.add("black");
};
//Neiges
if ((weatherCode3 >= 20 && weatherCode3 <= 22) || (weatherCode3 >= 60 && weatherCode3 <= 68) || (weatherCode3 >= 220 && weatherCode3 <= 222))  {
var Icon = document.getElementById("icont3");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-snow");
Icon.classList.add("black");
}

console.log("day 4 : " + parseInt(data.forecast[4].tmax) + "°C " + data.forecast[4].weather);
  // La pluie
  var weatherCode4 = parseInt(data.forecast[4].weather);
if ((weatherCode4 >= 10 && weatherCode4 <= 15) || (weatherCode4 >= 40 && weatherCode4 <= 48) || (weatherCode4 >= 70 && weatherCode4 <= 78) || (weatherCode4 >= 140 && weatherCode4 <= 212)) {
  var Icon = document.getElementById("icont4");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-rain");
  Icon.classList.add("black");
};

//Orages
if (weatherCode4 >= 100 && weatherCode4 <= 138) {
var Icon = document.getElementById("icont4");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-storm-showers");
Icon.classList.add("black");
};
//Ciel voilé
if (weatherCode4 == 2 ) {
var Icon = document.getElementById("icont4");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-cloudy");
Icon.classList.add("black");
};
// Nuages
if ((weatherCode4 == 1) || (weatherCode4 >= 3 && weatherCode4 <= 7)) {
var Icon = document.getElementById("icont4");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-cloud");
Icon.classList.add("black");
};
//Neiges
if ((weatherCode4 >= 20 && weatherCode4 <= 22) || (weatherCode4 >= 60 && weatherCode4 <= 68) || (weatherCode4 >= 220 && weatherCode4 <= 222)) {
var Icon = document.getElementById("icont4");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-snow");
Icon.classList.add("black");
}

console.log("day 5 : " + parseInt(data.forecast[5].tmax) + "°C " + data.forecast[5].weather);
  // La pluie
  var weatherCode5 = parseInt(data.forecast[5].weather);
if ((weatherCode5 >= 10 && weatherCode5 <= 15) || (weatherCode5 >= 40 && weatherCode5 <= 48) || (weatherCode5 >= 70 && weatherCode5 <= 78) || (weatherCode5 >= 140 && weatherCode5 <= 212)) {
  var Icon = document.getElementById("icont5");
  Icon.classList.remove("wi-day-sunny");
  Icon.classList.add("wi-rain");
  Icon.classList.add("black");
};

//Orages
if (weatherCode5 >= 100 && weatherCode5 <= 138) {
var Icon = document.getElementById("icont5");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-storm-showers");
Icon.classList.add("black");
};
//Ciel voilé
if (weatherCode5 == 2 ) {
var Icon = document.getElementById("icont5");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-day-cloudy");
Icon.classList.add("black");
};
// Nuages
if ((weatherCode5 == 1) || (weatherCode5 >= 3 && weatherCode5 <= 7)) {
var Icon = document.getElementById("icont5");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-cloud");
Icon.classList.add("black");
};
//Neiges
if ((weatherCode5 >= 20 && weatherCode5 <= 22) || (weatherCode5 >= 60 && weatherCode5 <= 68) || (weatherCode5 >= 220 && weatherCode5 <= 222))  {
var Icon = document.getElementById("icont5");
Icon.classList.remove("wi-day-sunny");
Icon.classList.add("wi-snow");
Icon.classList.add("black");
}
};
