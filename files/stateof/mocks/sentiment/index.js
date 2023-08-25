import { createApp } from '../models.js'
import questions from '../sample-questions.js';
import { fetchSurveyCSS } from '../util.js';

globalThis.app = createApp({
	data() {
		return {
			questions
		};
	},
}).mount(document.body);

fetchSurveyCSS();