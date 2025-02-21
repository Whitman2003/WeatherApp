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

    const weatherURL =`https://api.open-meteo.com/v1/forecast?latitude=${strLat}&longitude=${strLong}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration`;
      
    //Gets the data
    try {
        console.log("API URL: ", weatherURL);
        const objWeatherResponse = await fetch(weatherURL);
        const objWeatherResponses = await objWeatherResponse.json();
        console.log(objWeatherResponses);

        console.log("API Response: ", objWeatherResponses);

        if (!objWeatherResponse || objWeatherResponse.length === 0) {
            throw new Error("No data returned from the API");
        }

        console.log("Response: ", objWeatherResponse);
        
        //Set the data
        const strLatitude = objWeatherResponses.latitude;
        const strLongitude = objWeatherResponses.longitude;
        const strGenerationTime = objWeatherResponses.generationtime_ms;
        const strUTCOffsetSeconds = objWeatherResponses.utc_offset_seconds;
        const strTimezone = objWeatherResponses.timezone;
        const strTimezoneAbbr = objWeatherResponses.timezone_abbreviation;
        const strEleveation = objWeatherResponses.elevation;

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
        const strTime = objWeatherResponses.hourly_units.time;
        const strTemperature = objWeatherResponses.hourly_units.temperature_2m;
        const strRelativeHumidity = objWeatherResponses.hourly_units.relative_humidity_2m;
        const strApparentTemperature = objWeatherResponses.hourly_units.apparent_temperature;
        const strPrecipitationProbability = objWeatherResponses.hourly_units.precipitation_probability;
        const strPrecipitation = objWeatherResponses.hourly_units.precipitation;
        const strRain = objWeatherResponses.hourly_units.rain;
        const strShowers = objWeatherResponses.hourly_units.showers;
        const strSnowfall = objWeatherResponses.hourly_units.snowfall;
        const strSnowDepth = objWeatherResponses.hourly_units.snow_depth;
        const strCloudCover = objWeatherResponses.hourly_units.cloud_cover;
        const strVisibility = objWeatherResponses.hourly_units.visibility;
        const strWindSpeed = objWeatherResponses.hourly_units.wind_speed_10m;
        const strWindDirection = objWeatherResponses.hourly_units.wind_direction_10m;
        const strWindGusts = objWeatherResponses.hourly_units.wind_gusts_10m;
        const strSoilTemperature = objWeatherResponses.hourly_units.soil_temperature_0cm;
        const strSoilMoisture = objWeatherResponses.hourly_units.soil_moisture_0_to_1cm;

        //Set the hourly data
        //Time for all
        const arrTime = objWeatherResponses.hourly.time;

        //Precipitation
        const arrPrecipitationProbability = objWeatherResponses.hourly.precipitation_probability;
        const arrPrecipitation = objWeatherResponses.hourly.precipitation;
        const arrRain = objWeatherResponses.hourly.rain;
        const arrShowers = objWeatherResponses.hourly.showers;
        const arrSnowfall = objWeatherResponses.hourly.snowfall;
        const arrSnowDepth = objWeatherResponses.hourly.snow_depth;

        //Make into HTML
        let hourlyPrecipitationDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Precipitation Probability</th><th>Precipitation</th><th>Rain</th><th>Showers</th><th>Snowfall</th><th>Snow Depth</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlyPrecipitationDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationProbability[i]} ${strPrecipitationProbability}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitation[i]} ${strPrecipitation}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrRain[i]} ${strRain}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrShowers[i]} ${strShowers}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSnowfall[i]} ${strSnowfall}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSnowDepth[i]} ${strSnowDepth}</td>
                </tr>`;
        }
        hourlyPrecipitationDataHTML += '</tbody></table>';
        document.querySelector('#hourlyPrecipitationData').innerHTML = hourlyPrecipitationDataHTML;

        //Make the bargraph for precipitation
        const precipitationCanvas = document.getElementById('precipitationChart');
        const precipitationCtx = precipitationCanvas.getContext('2d');

        const precipitationBarWidth = 30;
        const precipitationGap = 10;
        const precipitationHeight = precipitationCanvas.height - 40;
        const precipitationChartWidth = precipitationCanvas.width - 40;

        const maxPrecipitation = Math.max(...arrPrecipitation);
        const precipitationScale = precipitationHeight / maxPrecipitation;

        precipitationCtx.clearRect(0, 0, precipitationCanvas.width, precipitationCanvas.height);

        arrPrecipitation.forEach((precipitation, index) => {
            const barHeight = precipitation * precipitationScale;
            const x = index * (precipitationBarWidth + precipitationGap) +20;
            const y = precipitationCanvas.height - barHeight + 20;

            precipitationCtx.fillStyle = 'blue';
            precipitationCtx.fillRect(x, y, precipitationBarWidth, barHeight);

            precipitationCtx.fillStyle = 'black';
            precipitationCtx.font = '12px Arial';
            precipitationCtx.fillText(arrTime[index], x + 5, y + 15);
        });

        precipitationCtx.fillStyle = 'black';
        precipitationCtx.font = '20px Arial';
        precipitationCtx.fillText('Precipitation (mm)', 10, 20);

        //Wind
        const arrWindSpeed = objWeatherResponses.hourly.wind_speed_10m;
        const arrWindDirection = objWeatherResponses.hourly.wind_direction_10m;
        const arrWindGusts = objWeatherResponses.hourly.wind_gusts_10m;

        //Make into HTML
        let hourlyWindDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Wind Speed</th><th>Wind Direction</th><th>Wind Gusts</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlyWindDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindSpeed[i]} ${strWindSpeed}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindDirection[i]} ${strWindDirection}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindGusts[i]} ${strWindGusts}</td>
                </tr>`;
        }
        hourlyWindDataHTML += '</tbody></table>';
        document.querySelector('#hourlyWindData').innerHTML = hourlyWindDataHTML;

        //Temperature
        const arrTemperature = objWeatherResponses.hourly.temperature_2m;
        const arrRelativeHumidity = objWeatherResponses.hourly.relative_humidity_2m;
        const arrApparentTemperature = objWeatherResponses.hourly.apparent_temperature;

        //Make into HTML
        let hourlyTemperatureDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Temperature</th><th>Relative Humidity</th><th>Apparent Temperature</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlyTemperatureDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrTemperature[i]} ${strTemperature}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrRelativeHumidity[i]} ${strRelativeHumidity}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrApparentTemperature[i]} ${strApparentTemperature}</td>
                </tr>`;
        }
        hourlyTemperatureDataHTML += '</tbody></table>';
        document.querySelector('#hourlyTemperatureData').innerHTML = hourlyTemperatureDataHTML;
        
        //Visibility
        const arrCloudCover = objWeatherResponses.hourly.cloud_cover;
        const arrVisibility = objWeatherResponses.hourly.visibility;

        //Make into HTML
        let hourlyVisibilityDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Cloud Coverage</th><th>Visibility</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlyVisibilityDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrCloudCover[i]} ${strCloudCover}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrVisibility[i]} ${strVisibility}</td>
                </tr>`;
        }
        hourlyVisibilityDataHTML += '</tbody></table>';
        document.querySelector('#hourlyVisibilityData').innerHTML = hourlyVisibilityDataHTML;
        
        //Soil
        const arrSoilTemperature = objWeatherResponses.hourly.soil_temperature_0cm;
        const arrSoilMoisture = objWeatherResponses.hourly.soil_moisture_0_to_1cm;

        //Make into HTML
        let hourlySoilDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Soil Temperature</th><th>Soil Moisture</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            hourlySoilDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSoilTemperature[i]} ${strSoilTemperature}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSoilMoisture[i]} ${strSoilMoisture}</td>
                </tr>`;
        }
        hourlySoilDataHTML += '</tbody></table>';
        document.querySelector('#hourlySoilData').innerHTML = hourlySoilDataHTML;
        
    } catch (error) {
        console.error("Error getting weather information: ", error);
    }
});