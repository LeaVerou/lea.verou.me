import questions from './sample-questions.js';
import { createApp, fetchSurveyCSS } from '../util.js';

globalThis.app = createApp({
	data() {
		return {
			questions
		};
	},
}).mount(document.body);

fetchSurveyCSS();