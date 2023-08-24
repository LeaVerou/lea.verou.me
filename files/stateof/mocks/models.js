import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export { createApp, nextTick};

import { delay } from './util.js';

class Option {
	selected_sentiment = 0;
	_selected = false;

	constructor(data, question) {
		Object.assign(this, data);
		this.question = question;

		// Sentiment labels can live either in the options or in the question
		// If none are found in the option, use the ones from the question
		if (this.sentiment === undefined && question.sentiment) {
			this.sentiment = question.sentiment;
		}
	}

	async pick_sentiment(i, $event) {
		let wasSelected = this.selected;
		this.selected = true;

		if (!wasSelected) {
			await nextTick();
		}

		if (this.selected_sentiment === i) {
			// Clicking on selected sentiment should unselect it
			await nextTick();
			await delay(0); // no idea 🤷🏽‍♀️
			this.selected_sentiment = 0;
		}
		else {
			this.selected_sentiment = i;
		}
	}

	set selected (selected) {
		let oldSelected = this._selected;

		this._selected = selected;

		if (oldSelected !== selected) {
			this.selected_sentiment = 0;
			this.question._changed(this);
		}
	}

	get selected() {
		return this._selected;
	}
}

class Question {
	options = [];

	constructor(data) {
		Object.assign(this, data);
		this.options = this.options.map(o => new Option(o, this));
	}

	clear () {
		this.options.forEach(o => o.selected = false);
	}

	_changed (option) {
		if (this.open_comment) {
			this.open_comment = false;
		}
	}

	// Sentiment presets
	static SENTIMENT_INTEREST = [ "Interested", "Not interested" ];
	static SENTIMENT_TRY = [ "Want to try", "Not interested" ];
	static SENTIMENT_USE = [ "Want to use again", "Don’t want to use again" ];
}

class SingleChoiceQuestion extends Question {
	get selected_option() {
		return this.options.find(o => o.value === this.answer);
	}

	get selected_sentiment_label() {
		if (!this.selected_option || !this.selected_sentiment) {
			return "";
		}

		let i = this.selected_sentiment < 0? 1 : 0;
		return this.selected_option.sentiment[i];
	}

	get answer () {
		return this.options.find(o => o.selected)?.value;
	}

	set answer (answer) {
		this.options.forEach(o => o.selected = o.value === answer);
	}

	_changed (option) {
		super._changed(option);

		if (option.selected) {
			// Unselect all other options
			for (let o of this.options) {
				if (o !== option) {
					o.selected = false;
				}
			}
		}
	}
}

class MultiChoiceQuestion extends Question {
	multiple = true;

	get selected_options() {
		let answers = new Set(this.answer);
		return this.options.filter(o => answers.has(o.value));
	}

	get answer () {
		return this.options.filter(o => o.selected).map(o => o.value);
	}

	set answer (answer) {
		this.options.forEach(o => o.selected = answer.includes(o.value));
	}
}

export {
	Option,
	Question,
	SingleChoiceQuestion,
	MultiChoiceQuestion,
}