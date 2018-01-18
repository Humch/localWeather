var celsius = 1;

function displayWeather(weather) {
    console.log(weather);
    $("#positionName").append(weather.name + ", " + weather.sys.country);
    document.getElementById("weatherIcon").src = weather.weather[0].icon;
    $("#weatherDescription").append(weather.weather[0].description);
    $("#weatherTemperature").append(weather.main.temp);
    celsiusTemp = weather.main.temp;
}

function switchUnit() {
    $("#weatherTemperature").empty();
    $("#weatherTemperatureUnit").empty();
    if( celsius === 1) {
        celsius = 0;
        fahrenheitTemp = ((celsiusTemp * 1.8) + 32).toFixed(2);
        $("#weatherTemperature").append(fahrenheitTemp);
        $("#weatherTemperatureUnit").append("° F");
    } else {
        celsius = 1;
        $("#weatherTemperature").append(celsiusTemp);
        $("#weatherTemperatureUnit").append("° C");
    }
}

function getLocation() {
    if(navigator.geolocation) {
          // L'API est disponible
        navigator.geolocation.getCurrentPosition(localWeather);
    } else {
        // Pas de support, proposer une alternative ?
        console.log("pas de geoloc !");
        $('#noGeolocation').modal('show');
    }
}

function localWeather(position) {
    $.ajax( {
        url : 'https://fcc-weather-api.glitch.me/api/current?',
        dataType : 'json',
        type : 'GET',
        data : { lon : position.coords.longitude, lat : position.coords.latitude},
        success : function(result) {
            displayWeather(result);
        }
    });
}