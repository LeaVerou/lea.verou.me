import { createApp } from '../models.js'
import { fetchSurveyCSS } from '../util.js';
import questions from '../sample-questions.js';

fetchSurveyCSS();


globalThis.app = createApp({
	data() {
		return {
			questions
		};
	},

	computed: {

	},

	methods: {

	},

	watch: {

	}
}).mount(document.body);