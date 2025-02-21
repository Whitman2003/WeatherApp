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
        const strEleveation = objWeatherResponses.elevation;
        const strGenerationTime = objWeatherResponses.generationtime_ms;
        const strLatitude = objWeatherResponses.latitude;
        const strLongitude = objWeatherResponses.longitude;
        const strTimezone = objWeatherResponses.timezone;
        const strUTCOffsetSeconds = objWeatherResponses.utc_offset_seconds;
        const strTimezoneAbbr = objWeatherResponses.timezone_abbreviation;
        

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

        //Set the daily units
        const strApparentTemperatureMax = objWeatherResponses.daily_units.apparent_temperature_max;
        const strApparentTemperatureMin = objWeatherResponses.daily_units.apparent_temperature_min;
        const strDaylightDuration = objWeatherResponses.daily_units.daylight_duration;
        const strEvapotranspiration = objWeatherResponses.daily_units.et0_fao_evapotranspiration;
        const strPrecipitationHours = objWeatherResponses.daily_units.precipitation_hours;
        const strPrecipitationProbabilityMax = objWeatherResponses.daily_units.precipitation_probability_max;
        const strRainSum = objWeatherResponses.daily_units.rain_sum;
        const strShortwaveRadiationSum = objWeatherResponses.daily_units.shortwave_radiation_sum;
        const strShowersSum = objWeatherResponses.daily_units.showers_sum;
        const strSnowfallSum = objWeatherResponses.daily_units.snowfall_sum;
        const strSunrise = objWeatherResponses.daily_units.sunrise;
        const strSunset = objWeatherResponses.daily_units.sunset;
        const strSunshineDuration = objWeatherResponses.daily_units.sunshine_duration;
        const strTemperature2mMax = objWeatherResponses.daily_units.temperature_2m_max;
        const strTemperature2mMin = objWeatherResponses.daily_units.temperature_2m_min;
        strTime = objWeatherResponses.daily_units.time;
        const strUvIndexClearSkyMax = objWeatherResponses.daily_units.uv_index_clear_sky_max;
        const strUvIndexMax = objWeatherResponses.daily_units.uv_index_max;
        const strWindDirection10mDominant = objWeatherResponses.daily_units.wind_direction_10m_dominant;
        const strWindGusts10mMax = objWeatherResponses.daily_units.wind_gusts_10m_max;
        const strWindSpeed10mMax = objWeatherResponses.daily_units.wind_speed_10m_max;

        //Set the daily data
        const arrApparentTemperatureMax = objWeatherResponses.daily.apparent_temperature_max;
        const arrApparentTemperatureMin = objWeatherResponses.daily.apparent_temperature_min;
        const arrDaylightDuration = objWeatherResponses.daily.daylight_duration;
        const arrEvapotranspiration = objWeatherResponses.daily.et0_fao_evapotranspiration;
        const arrPrecipitationHours = objWeatherResponses.daily.precipitation_hours;
        const arrPrecipitationProbabilityMax = objWeatherResponses.daily.precipitation_probability_max;
        const arrPrecipitationSum = objWeatherResponses.daily.precipitation_sum;
        const arrRainSum = objWeatherResponses.daily.rain_sum;
        const arrShortwaveRadiationSum = objWeatherResponses.daily.shortwave_radiation_sum;
        const arrShowersSum = objWeatherResponses.daily.showers_sum;
        const arrSnowfallSum = objWeatherResponses.daily.snowfall_sum;
        const arrSunrise = objWeatherResponses.daily.sunrise;
        const arrSunset = objWeatherResponses.daily.sunset;
        const arrSunshineDuration = objWeatherResponses.daily.sunshine_duration;
        const arrTemperature2mMax = objWeatherResponses.daily.temperature_2m_max;
        const arrTemperature2mMin = objWeatherResponses.daily.temperature_2m_min;
        const arrTime = objWeatherResponses.daily.time;
        const arrUvIndexClearSkyMax = objWeatherResponses.daily.uv_index_clear_sky_max;
        const arrUvIndexMax = objWeatherResponses.daily.uv_index_max;
        const arrWindDirection10mDominant = objWeatherResponses.daily.wind_direction_10m_dominant;
        const arrWindGusts10mMax = objWeatherResponses.daily.wind_gusts_10m_max;
        const arrWindSpeed10mMax = objWeatherResponses.daily.wind_speed_10m_max;

        //Make into HTML
        let dailyPrecipitationDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Precipitation Probability</th><th>Precipitation</th><th>Rain</th><th>Showers</th><th>Snowfall</th><th>Snow Depth</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyPrecipitationDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationProbabilityMax[i]} ${strPrecipitationProbabilityMax}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationSum[i]} ${strPrecipitationSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrRainSum[i]} ${strRainSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrShowersSum[i]} ${strShowersSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSnowfallSum[i]} ${strSnowfallSum}&nbsp&nbsp&nbsp&nbsp</td>
                </tr>`;
        }
        dailyPrecipitationDataHTML += '</tbody></table>';
        document.querySelector('#dailyPrecipitationData').innerHTML = dailyPrecipitationDataHTML;

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
        const arrWindSpeed = objWeatherResponses.daily.wind_speed_10m;
        const arrWindDirection = objWeatherResponses.daily.wind_direction_10m;
        const arrWindGusts = objWeatherResponses.daily.wind_gusts_10m;

        //Make into HTML
        let dailyWindDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Wind Speed</th><th>Wind Direction</th><th>Wind Gusts</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyWindDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindSpeed[i]} ${strWindSpeed}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindDirection[i]} ${strWindDirection}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindGusts[i]} ${strWindGusts}</td>
                </tr>`;
        }
        dailyWindDataHTML += '</tbody></table>';
        document.querySelector('#dailyWindData').innerHTML = dailyWindDataHTML;

        //Temperature
        const arrTemperature = objWeatherResponses.daily.temperature_2m;
        const arrRelativeHumidity = objWeatherResponses.daily.relative_humidity_2m;
        const arrApparentTemperature = objWeatherResponses.daily.apparent_temperature;

        //Make into HTML
        let dailyTemperatureDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Temperature</th><th>Relative Humidity</th><th>Apparent Temperature</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyTemperatureDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrTemperature[i]} ${strTemperature}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrRelativeHumidity[i]} ${strRelativeHumidity}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrApparentTemperature[i]} ${strApparentTemperature}</td>
                </tr>`;
        }
        dailyTemperatureDataHTML += '</tbody></table>';
        document.querySelector('#dailyTemperatureData').innerHTML = dailyTemperatureDataHTML;
        
        //Visibility
        const arrCloudCover = objWeatherResponses.daily.cloud_cover;
        const arrVisibility = objWeatherResponses.daily.visibility;

        //Make into HTML
        let dailyVisibilityDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Cloud Coverage</th><th>Visibility</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyVisibilityDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrCloudCover[i]} ${strCloudCover}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrVisibility[i]} ${strVisibility}</td>
                </tr>`;
        }
        dailyVisibilityDataHTML += '</tbody></table>';
        document.querySelector('#dailyVisibilityData').innerHTML = dailyVisibilityDataHTML;
        
        //Soil
        const arrSoilTemperature = objWeatherResponses.daily.soil_temperature_0cm;
        const arrSoilMoisture = objWeatherResponses.daily.soil_moisture_0_to_1cm;

        //Make into HTML
        let dailySoilDataHTML = '<table class="weather-table"><thread><tr><th>Time</th><th>Soil Temperature</th><th>Soil Moisture</th></tr></thread><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailySoilDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSoilTemperature[i]} ${strSoilTemperature}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSoilMoisture[i]} ${strSoilMoisture}</td>
                </tr>`;
        }
        dailySoilDataHTML += '</tbody></table>';
        document.querySelector('#dailySoilData').innerHTML = dailySoilDataHTML;
        
    } catch (error) {
        console.error("Error getting weather information: ", error);
    }
});