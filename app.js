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

    const weatherURL =`https://api.open-meteo.com/v1/forecast?latitude=${strLat}&longitude=${strLong}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm`;
      
    //Gets the data
    try {
        console.log("API URL: ", weatherURL);
        const objWeatherResonse = await fetch(weatherURL);
        const objWeatherResonses = await objWeatherResonse.json();

        console.log("API Response: ", objWeatherResonses);

        if (!objWeatherResonse || objWeatherResonse.length === 0) {
            throw new Error("No data returned from the API");
        }

        console.log("Response: ", objWeatherResonse);
        
        //Set the data
        const strLatitude = objWeatherResonses.latitude;
        const strLongitude = objWeatherResonses.longitude;
        const strGenerationTime = objWeatherResonses.generationtime_ms;
        const strUTCOffsetSeconds = objWeatherResonses.utc_offset_seconds;
        const strTimezone = objWeatherResonses.timezone;
        const strTimezoneAbbr = objWeatherResonses.timezone_abbreviation;
        const strEleveation = objWeatherResonses.elevation;

        //Make into HTML
        const confirmWeatherDataHTML = `
        <p>Latitude: ${strLatitude}</p>
        <p>Longitude: ${strLongitude}</p>
        <p>Generation Time: ${strGenerationTime}</p>
        <p>UTC Offset Seconds: ${strUTCOffsetSeconds}</p>
        <p>Timezone: ${strTimezone}</p>
        <p>Timezone Abbreviation: ${strTimezoneAbbr}</p>
        <p>Elevation: ${strEleveation}</p>`;

        document.querySelector('#confirmWeatherData').innerHTML = confirmWeatherDataHTML;

        //Set the hourly units
        const strTime = objWeatherResonses.hourly_units.time;
        const strTemperature = objWeatherResonses.hourly_units.temperature_2m;
        const strRelativeHumidity = objWeatherResonses.hourly_units.relative_humidity_2m;
        const strApparentTemperature = objWeatherResonses.hourly_units.apparent_temperature;
        const strPrecipitationProbability = objWeatherResonses.hourly_units.precipitation_probability;
        const strPrecipitation = objWeatherResonses.hourly_units.precipitation;
        const strRain = objWeatherResonses.hourly_units.rain;
        const strShowers = objWeatherResonses.hourly_units.showers;
        const strSnowfall = objWeatherResonses.hourly_units.snowfall;
        const strSnowDepth = objWeatherResonses.hourly_units.snow_depth;
        const strCloudCover = objWeatherResonses.hourly_units.cloud_cover;
        const strVisibility = objWeatherResonses.hourly_units.visibility;
        const strWindSpeed = objWeatherResonses.hourly_units.wind_speed_10m;
        const strWindDirection = objWeatherResonses.hourly_units.wind_direction_10m;
        const strWindGusts = objWeatherResonses.hourly_units.wind_gusts_10m;
        const strSoilTemperature = objWeatherResonses.hourly_units.soil_temperature_0cm;
        const strSoilMoisture = objWeatherResonses.hourly_units.soil_moisture_0_to_1cm;

        //Set the hourly data
        //Time for all
        const arrTime = objWeatherResonses.hourly.time;

        //Precipitation
        const arrPrecipitationProbability = objWeatherResonses.hourly.precipitation_probability;
        const arrPrecipitation = objWeatherResonses.hourly.precipitation;
        const arrRain = objWeatherResonses.hourly.rain;
        const arrShowers = objWeatherResonses.hourly.showers;
        const arrSnowfall = objWeatherResonses.hourly.snowfall;
        const arrSnowDepth = objWeatherResonses.hourly.snow_depth;

        //Make into HTML
        let hourlyPrecipitationDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Precipitation Probability</th><th>Precipitation</th><th>Rain</th><th>Showers</th><th>Snowfall</th><th>Snow Depth</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlyPrecipitationDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp</td>
                    <td>${arrPrecipitationProbability[i]} ${strPrecipitationProbability}</td>
                    <td>${arrPrecipitation[i]} ${strPrecipitation}</td>
                    <td>${arrRain[i]} ${strRain}</td>
                    <td>${arrShowers[i]} ${strShowers}</td>
                    <td>${arrSnowfall[i]} ${strSnowfall}</td>
                    <td>${arrSnowDepth[i]} ${strSnowDepth}</td>
                </tr>`;
        }
        hourlyPrecipitationDataHTML += '</tbody></table>';
        document.querySelector('#hourlyPrecipitationData').innerHTML = hourlyPrecipitationDataHTML;

        //Wind
        const arrWindSpeed = objWeatherResonses.hourly.wind_speed_10m;
        const arrWindDirection = objWeatherResonses.hourly.wind_direction_10m;
        const arrWindGusts = objWeatherResonses.hourly.wind_gusts_10m;

        //Temperature
        const arrTemperature = objWeatherResonses.hourly.temperature_2m;
        const arrRelativeHumidity = objWeatherResonses.hourly.relative_humidity_2m;
        const arrApparentTemperature = objWeatherResonses.hourly.apparent_temperature;
        
        //Visibility
        const arrCloudCover = objWeatherResonses.hourly.cloud_cover;
        const arrVisibility = objWeatherResonses.hourly.visibility;
        
        //Soil
        const arrSoilTemperature = objWeatherResonses.hourly.soil_temperature_0cm;
        const arrSoilMoisture = objWeatherResonses.hourly.soil_moisture_0_to_1cm;
        
    } catch (error) {
        console.error("Error getting weather information: ", error);
    }
});