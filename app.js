//Imports
import { fetchWeatherApi } from 'https://cdn.jsdelivr.net/npm/openmeteo@latest/+esm';

// click event for btnLocation
document.querySelector('#btnLocation').addEventListener('click', async function(){
    // Retrieve the values from your login form
    const strLat = document.querySelector('#txtLatitude').value;
    const strLong = document.querySelector('#txtLongitude').value;

    // Validate the data
    let blnError = false;
    let strMessage = '';

    if(!strLat){
        blnError = true;
        strMessage += '<p>Latitude is required!</p>\n';
    }

    if(!strLong){
        blnError = true;
        strMessage += '<p>Longitude is required</p>\n';
    }

    if(blnError === true){
        //Sweet Alert
        Swal.fire({
            title: "There is an error!",
            html: strMessage,
            icon: "error"
        });
    }

    //Contains the location data
    const objLocation = {
        "latitude": strLat,
        "longitude": strLong,
        "hourly": ["temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "precipitation_probability",
                    "precipitation",
                    "rain",
                    "showers",
                    "snowfall",
                    "snow_depth",
                    "cloud_cover",
                    "visibility",
                    "wind_speed_10m",
                    "wind_direction_10m",
                    "wind_gusts_10m",
                    "soil_temperature_0cm",
                    "soil_moisture_0_to_1cm"]
    };

    //Gets the data
    const weatherURL = "https://api.open-meteo.com/v1/forecast";
    const objWeatherResonse = await fetchWeatherApi(weatherURL, objLocation);

    //Get the first location
    const objFirstLocation = objWeatherResonse[0];

    //Attributes for timezone and location
    const strUTCOffsetSeconds = Response.utcOffsetSeconds();
    const strTimezone = Response.timezone();
    const strTimezoneAbbr = Response.timezoneAbbreviation();
    const strLatitude = Response.latitude();
    const strLongitude = Response.longitude();

    const hourly = Response.hourly();

    const objWeatherData = {
        hourly: {
            time: Range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + strUTCOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            relativeHumidity2m: hourly.variables(1).valuesArray(),
            apparentTemperature: hourly.variables(2).valuesArray(),
            precipitationProbability: hourly.variables(3).valuesArray(),
            precipitation: hourly.variables(4).valuesArray(),
            rain: hourly.variables(5).valuesArray(),
            showers: hourly.variables(6).valuesArray(),
            snowfall: hourly.variables(7).valuesArray(),
            snowDepth: hourly.variables(8).valuesArray(),
            cloudCover: hourly.variables(9).valuesArray(),
            visibility: hourly.variables(10).valuesArray(),
            windSpeed10m: hourly.variables(11).valuesArray(),
            windDirection10m: hourly.variables(12).valuesArray(),
            windGusts10m: hourly.variables(13).valuesArray(),
            soilTemperature0cm: hourly.variables(14).valuesArray(),
            soilMoisture0to1cm: hourly.variables(15).valuesArray()
        },
    };

    for(let i = 0; i < objWeatherData.hourly.time.length; i++) {
        console.log(
            objWeatherData.hourly.time[i].toISOString(),
            objWeatherData.hourly.temperature2m[i],
            objWeatherData.hourly.relativeHumidity2m[i],
            objWeatherData.hourly.apparentTemperature[i],
            objWeatherData.hourly.precipitationProbability[i],
            objWeatherData.hourly.precipitation[i],
            objWeatherData.hourly.rain[i],
            objWeatherData.hourly.showers[i],
            objWeatherData.hourly.snowfall[i],
            objWeatherData.hourly.snowDepth[i],
            objWeatherData.hourly.cloudCover[i],
            objWeatherData.hourly.visibility[i],
            objWeatherData.hourly.windSpeed10m[i],
            objWeatherData.hourly.windDirection10m[i],
            objWeatherData.hourly.windGusts10m[i],
            objWeatherData.hourly.soilTemperature0cm[i],
            objWeatherData.hourly.soilMoisture0to1cm[i]
        );
    }
})