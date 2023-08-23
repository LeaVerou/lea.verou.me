import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { fetchSurveyCSS } from '../util.js';

fetchSurveyCSS();

async function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

globalThis.app = createApp({
	data() {
		return {
			mockup: 5,
			question: {
				selected_sentiment: null
			},
			ui: {
				options: [
					{
						icon: "🤷",
						label: "Never heard of it",
						value: "never_heard",
						sentiment: [ "Interested", "Not interested" ],
					},
					{
						icon: "👀",
						label: "Heard of it",
						value: "heard",
						sentiment: [ "Want to try", "Not interested" ],
					},
					{
						icon: "🤓",
						label: "Used it",
						value: "used",
						sentiment: [ "Want to use again", "Don’t want to use again" ],
					},
				]
			}
		};
	},

	computed: {
		selected_option() {
			return this.ui.options.find(o => o.value === this.question.answer);
		},

		selected_index() {
			return this.ui.options.findIndex(o => o.value === this.question.answer);
		},

		selected_sentiment_label() {
			if (!this.selected_option || !this.question.selected_sentiment) {
				return "";
			}

			let i = this.question.selected_sentiment < 0? 1 : 0;
			return this.selected_option.sentiment[i];
		},
	},

	methods: {
		pick_option(option) {
			if (this.question.answer === option.value) {
				return false;
			}

			this.question.answer = option.value;
			return true;
		},

		async pick_sentiment(label, i, option, $event) {
			let changed = this.pick_option(option);
			if (changed) {
				await nextTick();
			}

			if (this.question.selected_sentiment === i) {
				// Clicking on selected sentiment should unselect it
				await nextTick();
				await delay(0); // no idea 🤷🏽‍♀️
				this.question.selected_sentiment = 0;
			}
			else {
				this.question.selected_sentiment = i;
			}
		}
	},

	watch: {
		async "question.answer"(answer) {
			if (this.question.selected_sentiment !== 0) {
				this.question.selected_sentiment = 0;
			}

			this.question.open_comment = false;
		}
	}
}).mount(document.body);