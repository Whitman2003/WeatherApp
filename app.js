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
        return;
    }

    //Contains the location data
    const objLocation = {
        "latitude": Number(strLat),
        "longitude": Number(strLong),
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
                    "soil_moisture_0_to_1cm"],
                "format": "json"
    };

    //Gets the data
    try {
        //const weatherURL = "https://api.open-meteo.com/v1/forecast";
        const objWeatherResonse = await fetchWeatherApi(objLocation);
        console.log("API Response: ", objWeatherResonse);

        if (!objWeatherResonse || objWeatherResonse.length === 0) {
            throw new Error("No data returned from the API");
        }

        //Get the first location
        const objFirstLocation = objWeatherResonse[0];

        //Attributes for timezone and location
        const strUTCOffsetSeconds = objWeatherResonse.utc_offset_seconds;
        const strTimezone = objWeatherResonse.timezone;
        const strTimezoneAbbr = objWeatherResonse.timezone_abbreviation;
        const strLatitude = objWeatherResonse.latitude;
        const strLongitude = objWeatherResonse.longitude;

        const hourly = objWeatherResonse.hourly;

        const objWeatherData = {
            hourly: {
                time: Range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + strUTCOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables[0].values,
                relativeHumidity2m: hourly.variables[1].values,
                apparentTemperature: hourly.variables[2].values,
                precipitationProbability: hourly.variables[3].values,
                precipitation: hourly.variables[4].values,
                rain: hourly.variables[5].values,
                showers: hourly.variables[6].values,
                snowfall: hourly.variables[7].values,
                snowDepth: hourly.variables[8].values,
                cloudCover: hourly.variables[9].values,
                visibility: hourly.variables[10].values,
                windSpeed10m: hourly.variables[11].values,
                windDirection10m: hourly.variables[12].values,
                windGusts10m: hourly.variables[13].values,
                soilTemperature0cm: hourly.variables[14].values,
                soilMoisture0to1cm: hourly.variables[15].values
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
    } catch (error) {
        console.error("Error getting weather information: ", error);
    }
});