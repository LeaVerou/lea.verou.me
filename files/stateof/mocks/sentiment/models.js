

import { delay, nextTick } from '../util.js';

class Option {
	sentiment = 0;
	_selected = false;

	constructor(data, question) {
		Object.assign(this, data);
		this.question = question;

		// Sentiment labels can live either in the options or in the question
		// If none are found in the option, use the ones from the question
		if (this.sentiments === undefined && question.sentiments) {
			this.sentiments = question.sentiments;
		}
	}

	async pick_sentiment(i) {
		let wasSelected = this.selected;
		this.selected = true;

		if (!wasSelected) {
			await nextTick();
		}

		if (this.sentiment === i) {
			// Clicking on selected sentiment should unselect it
			await nextTick();
			await delay(0); // no idea 🤷🏽‍♀️
			this.sentiment = 0;
		}
		else {
			this.sentiment = i;
		}
	}

	set selected (selected) {
		let oldSelected = this._selected;

		this._selected = selected;

		if (oldSelected !== selected) {
			this.sentiment = 0;
			this.question._changed(this);
			if (this.open_comment) {
				this.open_comment = false;
			}
		}
	}

	get selected() {
		return this._selected;
	}

	get sentiment_label() {
		if (!this.selected || !this.sentiment) {
			return "";
		}

		let i = this.sentiment < 0? 1 : 0;
		return this.sentiments[i];
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

	_changed (option) {}

	// Sentiment presets
	static SENTIMENTS_INTEREST = [ "Interested", "Not interested" ];
	static SENTIMENTS_TRY = [ "Want to try", "Not interested" ];
	static SENTIMENTS_USE = [ "Want to use again", "Don’t want to use again" ];
}

class SingleChoiceQuestion extends Question {
	get selected_option() {
		return this.options.find(o => o.value === this.answer);
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