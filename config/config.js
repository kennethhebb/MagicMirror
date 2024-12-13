/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "192.168.4.23",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "MMM-EyeCandy",
			position: "top_center",
			config: {
				maxWidth: "75%",       // Sizes the images. Retains aspect ratio.
				style: '37',            // Style number or use ownImagePath to override style
				ownImagePath: '',      // ex: 'modules/MMM-EyeCandy/pix/YOUR_PICTURE_NAME.jpg', or internet url to image
				
			}
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "House Calendar",
			position: "top_left",
			config: {
				calendars: [
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000,
					// 	symbol: "calendar-check",
					// 	url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics"
					// },
					{
						fetchInterval: 120000,
						url: "https://calendar.google.com/calendar/ical/kenmhebb%40gmail.com/private-0c390588d84c62504ad0c25a6a5d2f67/basic.ics"
					},
					{
						fetchInterval: 120000,
						url: "https://calendar.google.com/calendar/ical/0eaco9419knr8futm95i6ml9gs%40group.calendar.google.com/private-830a98685d7baf5e2d6654bd217e9eb0/basic.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "weather",
			position: "top_right",
			header: "Outside Conditions",
			config: {
				weatherProvider: "localweather",
				type: "current",
				location: "exterior",
				apiBase: "http://192.168.4.39:8080",
				endpoint: "/api/currentConditions",
				showHumidity: true,
				showWindSpeed: true,
				showWindDirection: true,
				showWindDirectionAsArrow: false,
				showSun: true,           // Show sunrise/sunset
				showFeelsLike: false,    // Disable feels like
				roundTemp: false,
				units: "metric",
				showIndoorTemperature: false,
				showIndoorHumidity: false,
				showPressure: true
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Indoor Conditions",
			config: {
				weatherProvider: "localweather",
        	type: "current",
        	location: "interior",
        	apiBase: "http://192.168.4.39:8080",
        	endpoint: "/api/currentConditions",
        	showHumidity: true,
        	showWindSpeed: false,    // Disable wind for interior
        	showWindDirection: false,
        	showSun: false,          // Disable sun for interior
        	showFeelsLike: false,
        	roundTemp: false,
        	units: "metric",
        	showIndoorTemperature: false,
        	showIndoorHumidity: false
			}
		},
		// {
		// 	module: "weather",
		// 	position: "top_right",
		// 	header: "Canton, NY:",
		// 	config: {
		// 		weatherProvider: "openweathermap",
		// 		type: "current",
		// 		location: "local current conditions",
		// 		locationID: "5132103", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; potsdam, ny
		// 		apiKey: "392885b1c5188fe3dfcc7728f62d0a57"
		// 	}
		// },
		{
			module: "weather",
			position: "top_right",
			header: "Angra do Heroismo, Azores:",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Azores",
				locationID: "3411865", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; potsdam, ny
				apiKey: "392885b1c5188fe3dfcc7728f62d0a57"
			}
		},
		// {
		// 	module: "weather",
		// 	position: "top_right",
		// 	header: "Auckland, New Zealand:",
		// 	config: {
		// 		weatherProvider: "openweathermap",
		// 		type: "current",
		// 		location: "Auckland, New Zealand",
		// 		locationID: "2193733", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; potsdam, ny
		// 		apiKey: "392885b1c5188fe3dfcc7728f62d0a57"
		// 	}
		// },
		{
			module: "weather",
			position: "top_right",
			header: "Reykjavic, Iceland:",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Reykjavic, Iceland",
				locationID: "2629691", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; potsdam, ny
				apiKey: "392885b1c5188fe3dfcc7728f62d0a57"
			}
		},
		// {
		// 	module: "weather",
		// 	position: "top_right",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		weatherProvider: "openweathermap",
		// 		type: "forecast",
		// 		location: "Reykjavik, Iceland",
		// 		locationID: "5132103", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
		// 		apiKey: "392885b1c5188fe3dfcc7728f62d0a57"
		// 	}
		// },
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
						title: "Washington Post",
						url: "https://feeds.washingtonpost.com/rss/world"
					},
					{
						title: "Politico",
						url: "https://rss.politico.com/politics-news.xml"
					},
					{
						title: "The Economist",
						url: "https://www.economist.com/the-world-this-week/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
