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
        const strTime = objWeatherResponses.daily_units.time;
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
        let dailyPrecipitationDataHTML = '<table class="table table-bordered text-center"><thead><tr><th>Time</th><th>Precipitation Probability</th><th>Precipitation</th><th>Rain</th><th>Showers</th><th>Snowfall</th><th>Snow Depth</th></tr></thead><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyPrecipitationDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationProbabilityMax[i]} ${strPrecipitationProbabilityMax}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationSum[i]}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrRainSum[i]} ${strRainSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrShowersSum[i]} ${strShowersSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrSnowfallSum[i]} ${strSnowfallSum}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrPrecipitationHours[i]} ${strPrecipitationHours}</td>
                </tr>`;
        }
        dailyPrecipitationDataHTML += '</tbody></table>';
        document.querySelector('#dailyPrecipitationData').innerHTML = dailyPrecipitationDataHTML;

        //Wind
        //Make into HTML
        let dailyWindDataHTML = '<table class="table table-bordered text-center"><thead><tr><th>Time</th><th>Wind Speed</th><th>Wind Direction</th><th>Wind Gusts</th></tr></thead><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyWindDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindDirection10mDominant[i]} ${strWindDirection10mDominant}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindGusts10mMax[i]} ${strWindGusts10mMax}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrWindSpeed10mMax[i]} ${strWindSpeed10mMax}</td>
                </tr>`;
        }
        dailyWindDataHTML += '</tbody></table>';
        document.querySelector('#dailyWindData').innerHTML = dailyWindDataHTML;

        //Temperature
        //Make into HTML
        let dailyTemperatureDataHTML = '<table class="table table-bordered text-center"><thead><tr><th>Time</th><th>Apparent Temperature Max</th><th>Apparent Temperature Min</th><th>Apparent Temperature 2m Max</th><th>Apparent Temperature 2m</th></tr></thead><tbody>';
        for (let i = 0; i < arrTime.length; i++) {
            dailyTemperatureDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrApparentTemperatureMax[i]} ${strApparentTemperatureMax}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrApparentTemperatureMin[i]} ${strApparentTemperatureMin}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrTemperature2mMax[i]} ${strTemperature2mMax}</td>
                    <td>${arrTemperature2mMin[i]} ${strTemperature2mMin}</td>
                </tr>`;
        }
        dailyTemperatureDataHTML += '</tbody></table>';
        document.querySelector('#dailyTemperatureData').innerHTML = dailyTemperatureDataHTML;
        
        //Sun Specs
        //Make into HTML
        let dailyVisibilityDataHTML = `<table class="table table-bordered text-center"><thead><tr><th>Time</th><th>Daylight Duration</th><th>Evapotranspiration</th>
                                        <th>Shortwave Radiation</th><th>Sunrise</th><th>Sunset</th><th>Sunsine Duration</th><th>UV Index Clear Sky Max</th><th>UV Index Max</th></tr></thead><tbody>`;
        for (let i = 0; i < arrTime.length; i++) {
            dailyVisibilityDataHTML += `
                <tr>
                    <td>${arrTime[i]} ${strTime}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrDaylightDuration[i]} ${strDaylightDuration}&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${arrEvapotranspiration[i]} ${strEvapotranspiration}</td>
                    <td>${arrShortwaveRadiationSum[i]} ${strShortwaveRadiationSum}</td>
                    <td>${arrSunrise[i]} ${strSunrise}</td>
                    <td>${arrSunset[i]} ${strSunset}</td>
                    <td>${arrSunshineDuration[i]} ${strSunshineDuration}</td>
                    <td>${arrUvIndexClearSkyMax[i]} ${strUvIndexClearSkyMax}</td>
                    <td>${arrUvIndexMax[i]} ${strUvIndexMax}</td>
                </tr>`;
        }
        dailyVisibilityDataHTML += '</tbody></table>';
        document.querySelector('#dailySunData').innerHTML = dailyVisibilityDataHTML;
    } catch (error) {
        console.error("Error getting weather information: ", error);
    }
});