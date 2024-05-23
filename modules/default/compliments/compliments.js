/* MagicMirror²
 * Module: Compliments
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("compliments", {
	// Module config defaults.
	defaults: {
		compliments: {
			anytime: ["The name that can be named is no the eternal name.",
			"If you overvalue possessions, people will begin to steal.",
			"In dwelling, live close to the ground.",
			"In thinking, keep to the simple.",
			"In conflict, be fair and generous.",
			"In governing, do not try to control.",
			"In work, do what you enjoy.",
			"In familiy life, be completely present.",
			"Do not compare or compete.", 
			"Fill your bowl to the brim, and it will spill.",
			"Keep sharpening your knife, and it will blunt.",
			"Chase after money and security, and your heart will never unclench.",
			"Care about people's approval, and you will be their prisoner.",
			"Do your work and then step back.",
			"Success is as dangerous as failure.",
			"When you stand with your feet on the ground, you will keep your balance.",
			"Whether you move up the ladder or down it, your position is shaky.",
			"Do you have the patience to wait until your mind settles and the water is clear?",
			"Can you remain unmoving until the right action arises by itself?",
			"If you don't trust people, you make them untrustworthy.",
			"When a country falls into chaos, patriotism is born.",
			"Stay the center and let things take their course.",
			"Express yourself completely, and then keep quiet.",
			"He who stands on tiptoe doesn't stand firm.",
			"He who rushes ahead, doesn't go far.",
			"He who tries to shine, dims his own light.",
			"He who defines himself, can't know who he really is.",
			"He who clings to his work will create nothing that endures.",
			"If you let restlessness move you, you lose touch with who you are.",
			"A good traveller has no fixed plans and is not intent upon arriving.",
			"Be a pattern for the world.",
			"Accept the world as it is.",
			"If you tamper with the world, you will ruin it.",
			"If you treat the world like an object, you will lose it.",
			"The Master sees things as they are, without trying to control them.",
			"For every force, there is a counterforce.",
			"Violence rebounds upon itself.",
			"All things end in the Tao, as rivers flow to the sea.",
			"Knowing others is intelligence, knowing yourself is true wisdom.",
			"Mastering other is strength, mastering yourself is true power.",
			"Let your workings remain a mystery, just show people the results.",
			"If you want to shrink something, you must first allow it to expand.",
			"If you want to get rid of something, you must first allow it to flourish.",
			"When there is no desire, all things are at peace.",
			"There is no greater illusion than fear.",
			"The master gives himself up to whatever the moment brings.",
			"The more prohibitions you have, the less virtuous people will be.",
			"Try to make people happy, and you lay the groundwork for misery.",
			"Give evil nothing to oppose and it will disappear by itself.",
			"Rushing into action, you fail.",
			"Trying to grasp things, you lose them.",
			"Remain calm at the end as the beginning.",
			"Don't educate, kindly teach them how to question.",
			"The simplest pattern is the clearest.",
			"When people know they do not know, they can find their way.",
			"There are just three things to learn: simplicity, patience, and compassion.",
			"Compete, but do it in the spirit of play.",
			"Presuming to know is a disease.",
			"When people lose their sense of awe, they turn to religion.",
			"When people no longer trust themselves, they begin to depend upon authority.",
			"Trying to control the future is like trying to take the master carpenter's place.",
			"When you handle the master carpenter's tools, chances are you'll cut your hand.",
			"Humans are born soft and supple; dead, they are stiff and hard.",
			"Whoever is stiff and inflexible is a disciple of death.",
			"Water, soft and yielding, dissolves the hard and inflexible.",
			"Remain serene, even in the midst of sorrow.",
			"Failure is an opportunity.",
			"If you blame someone else, there is no end to the blame.",
			"Fulfill your obligations, correct your mistakes, demand nothing of others.",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",
			"","","",




		],
			morning: ["Good morning!", "Bom dia!", "Goden daginn!", "Goedemorgen!", "Hyvaa huomenta!",
			"Kalimera!", "Bon matin!", "Bore da!", "Buenas dias!"
		],
			afternoon: ["I have loved the stars too fondly to be fearful of the night.",
			 "I'm afraid I can't allow you do that, Dave.", "Everybody's dead, Dave.", "Everybody's. Dead. Dave.", "Daisy, Daisy, give me your answer, do."],
			evening: ["", "", ""],
			"....-01-01": ["Happy new year!"],
			"....-11-02": ["Happy Birthday, Julie!"],
			"....-12-..": ["Fuck it, its Yule!"]
		},
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true
	},
	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: async function () {
		Log.info(`Starting module: ${this.name}`);

		this.lastComplimentIndex = -1;

		if (this.config.remoteFile !== null) {
			const response = await this.loadComplimentFile();
			this.config.compliments = JSON.parse(response);
			this.updateDom();
		}

		// Schedule update timer.
		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/**
	 * Generate a random index for a list of compliments.
	 * @param {string[]} compliments Array with compliments.
	 * @returns {number} a random index of given array
	 */
	randomIndex: function (compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		const generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		let complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/**
	 * Retrieve an array of compliments for the time of the day.
	 * @returns {string[]} array with compliments for the time of the day.
	 */
	complimentArray: function () {
		const hour = moment().hour();
		const date = moment().format("YYYY-MM-DD");
		let compliments = [];

		// Add time of day compliments
		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = [...this.config.compliments.morning];
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = [...this.config.compliments.afternoon];
		} else if (this.config.compliments.hasOwnProperty("evening")) {
			compliments = [...this.config.compliments.evening];
		}

		// Add compliments based on weather
		if (this.currentWeatherType in this.config.compliments) {
			Array.prototype.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		// Add compliments for anytime
		Array.prototype.push.apply(compliments, this.config.compliments.anytime);

		// Add compliments for special days
		for (let entry in this.config.compliments) {
			if (new RegExp(entry).test(date)) {
				Array.prototype.push.apply(compliments, this.config.compliments[entry]);
			}
		}

		return compliments;
	},

	/**
	 * Retrieve a file from the local filesystem
	 * @returns {Promise} Resolved when the file is loaded
	 */
	loadComplimentFile: async function () {
		const isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			url = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		const response = await fetch(url);
		return await response.text();
	},

	/**
	 * Retrieve a random compliment.
	 * @returns {string} a compliment
	 */
	getRandomCompliment: function () {
		// get the current time of day compliments list
		const compliments = this.complimentArray();
		// variable for index to next message to display
		let index;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return compliments[index] || "";
	},

	// Override dom generator.
	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		const complimentText = this.getRandomCompliment();
		// split it into parts on newline text
		const parts = complimentText.split("\n");
		// create a span to hold the compliment
		const compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (const part of parts) {
			if (part !== "") {
				// create a text element for each part
				compliment.appendChild(document.createTextNode(part));
				// add a break
				compliment.appendChild(document.createElement("BR"));
			}
		}
		// only add compliment to wrapper if there is actual text in there
		if (compliment.children.length > 0) {
			// remove the last break
			compliment.lastElementChild.remove();
			wrapper.appendChild(compliment);
		}
		return wrapper;
	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENTWEATHER_TYPE") {
			this.currentWeatherType = payload.type;
		}
	}
});
