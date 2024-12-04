/* MagicMirror² Custom Weather Provider
 * For local weather station
 */
WeatherProvider.register("localweather", {
    // Set the name of the provider.
    providerName: "Local Weather Station",

    // Set the default config properties
    defaults: {
        apiBase: "http://192.168.4.39",
        endpoint: "/api/currentConditions",
        location: "exterior",
    },

    // Overwrite the fetchCurrentWeather method.
    fetchCurrentWeather() {
        this.fetchData(this.getUrl())
            .then((data) => {
                const currentWeather = this.generateWeatherObjectFromCurrentWeather(data);
                this.setCurrentWeather(currentWeather);
            })
            .catch(function (request) {
                Log.error("Could not load data ... ", request);
            })
            .finally(() => this.updateAvailable());
    },

    // Since we're only doing current conditions, we'll return empty arrays for forecast
    fetchWeatherForecast() {
        this.setWeatherForecast([]);
        this.updateAvailable();
    },

    fetchWeatherHourly() {
        this.setWeatherHourly([]);
        this.updateAvailable();
    },

    /*
     * Gets the complete url for the request
     */
    getUrl() {
        return `this.config.apiBase + this.config.endpoint?location=${this.config.location}`;
    },

    /*
     * Generate a WeatherObject based on currentWeatherInformation
     */
    generateWeatherObjectFromCurrentWeather(currentWeatherData) {
        const currentWeather = new WeatherObject();

        currentWeather.date = moment(); // Current time
        currentWeather.humidity = currentWeatherData.humidity;
        currentWeather.temperature = parseFloat(currentWeatherData.temperature);
        currentWeather.windSpeed = currentWeatherData.windSpeed;
        currentWeather.windFromDirection = currentWeatherData.windFromDirection;
        
        // Parse sunrise and sunset if they're provided as strings
        if (currentWeatherData.sunrise) {
            currentWeather.sunrise = moment(currentWeatherData.sunrise);
        }
        if (currentWeatherData.sunset) {
            currentWeather.sunset = moment(currentWeatherData.sunset);
        }

        // You might want to add some basic weather type detection based on your data
        // For now, we'll just use a default
        currentWeather.weatherType = "day-sunny";

        return currentWeather;
    }
});
