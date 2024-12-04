/* MagicMirror² Custom Weather Provider
 * For local weather station
 */
WeatherProvider.register("localweather", {
	// Set the name of the provider.
	providerName: "Local Weather Station",

	// Set the default config properties
	defaults: {
		apiBase: "http://192.168.4.39:8080",
		endpoint: "/api/currentConditions",
		location: "exterior"
	},

	// Overwrite the fetchCurrentWeather method.
	fetchCurrentWeather() {
		const url = this.getUrl();
		console.log("Fetching from:", url);

		this.fetchData(this.getUrl())
			.then((data) => {
				console.log("Raw data received:", data);
				const currentWeather = this.generateWeatherObjectFromCurrentWeather(data);
				console.log("Weather object created:", currentWeather);
				this.setCurrentWeather(currentWeather);
				console.log("Current weather set - checking if loaded:", this.loaded);
			})
			.catch(function (request) {
				console.error("Could not load data ... ", request);
			})
			.finally(() => {
				console.log("Updating available status");
				this.updateAvailable();
			});
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
		return this.config.apiBase + this.config.endpoint + "?location=" + this.config.location;
	},

	/*
	 * Generate a WeatherObject based on currentWeatherInformation
	 */
	generateWeatherObjectFromCurrentWeather(currentWeatherData) {
		const currentWeather = new WeatherObject();

		// Common properties
		currentWeather.date = moment();
		currentWeather.humidity = currentWeatherData.humidity;
		currentWeather.temperature = parseFloat(currentWeatherData.temperature.replace("°C", ""));

		if (this.config.location === "exterior") {
			currentWeather.windSpeed = Math.round(currentWeatherData.windSpeed * 10) / 10;
			currentWeather.windFromDirection = currentWeatherData.windFromDirection;

			// Parse sunrise/sunset
			if (currentWeatherData.sunrise) {
				const [hours, minutes, seconds] = currentWeatherData.sunrise.split(":");
				currentWeather.sunrise = moment().set({
					hours: parseInt(hours),
					minutes: parseInt(minutes),
					seconds: parseInt(seconds)
				});
			}

			if (currentWeatherData.sunset) {
				const [hours, minutes, seconds] = currentWeatherData.sunset.split(":");
				currentWeather.sunset = moment().set({
					hours: parseInt(hours),
					minutes: parseInt(minutes),
					seconds: parseInt(seconds)
				});
			}

			// Add barometric pressure
			if (currentWeatherData.barometer) {
				currentWeather.pressure = parseFloat(currentWeatherData.barometer).toFixed(1);
			}

			// Determine if it's day or night
			const now = moment();
			const isDay = now.isBetween(currentWeather.sunrise, currentWeather.sunset);

			if (isDay) {
				// Daytime weather determination
				if (currentWeatherData.solarRadiation === 0 && currentWeatherData.uv === 0) {
					currentWeather.weatherType = "cloudy"; // Heavy overcast
				} else if (currentWeatherData.solarRadiation < 100 || currentWeatherData.uv < 1) {
					currentWeather.weatherType = "day-cloudy"; // Light overcast
				} else if (currentWeatherData.solarRadiation < 300 || currentWeatherData.uv < 3) {
					currentWeather.weatherType = "day-cloudy-high"; // Partly cloudy
				} else {
					currentWeather.weatherType = "day-sunny"; // Clear
				}
			} else {
				// Nighttime weather determination
				if (currentWeatherData.solarRadiation === 0 && currentWeatherData.uv === 0) {
					currentWeather.weatherType = "night-alt-cloudy"; // Cloudy night
				} else {
					currentWeather.weatherType = "night-clear"; // Clear night
				}
			}
		} else {
			// Interior - only set the necessary properties
			currentWeather.weatherType = "house";
		}

		console.log(`Generated ${this.config.location} weather object:`, currentWeather);
		console.log("Weather conditions - Solar:", currentWeatherData.solarRadiation, "UV:", currentWeatherData.uv);
		return currentWeather;
	}
});
