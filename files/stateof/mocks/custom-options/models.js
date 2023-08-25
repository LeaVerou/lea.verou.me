

import { delay, nextTick } from '../util.js';

class Option {
	_selected = false;

	constructor(data, question) {
		Object.assign(this, data);
		this.question = question;
	}

	set selected (selected) {
		let oldSelected = this._selected;

		this._selected = selected;

		if (oldSelected !== selected) {
			this.question._changed(this);
		}
	}

	get selected() {
		return this._selected;
	}
}

class CustomOption {
	value = "";

	constructor(question) {
		this.question = question;
	}

	// The checkbox of a custom option is a distraction:
	// when it is inconsistent with the presence or absence of text in the text field
	// (i.e. checking it without entering text or not checking it while entering text), that tends to be a mistake.
	// Better to disable it and use it entirely as output (checked if text is entered, unchecked if not).
	// This also improves keyboard UX and a11y by eliminating one pointless tab stop.
	get selected () {
		return !!this.value;
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
	customOptions = this.allowCustom ? [new CustomOption(this)] : [];

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

	custom_option_changed (i) {
		let option = this.customOptions[i];
		let nextOption = this.customOptions[i + 1];

		if (option.value && !nextOption) {
			this.customOptions.push(new CustomOption(this));
		}
	}

	remove_empty_custom_options () {
		for (let i = this.customOptions.length - 1; i > 0; i--) {
			let option = this.customOptions[i];
			if (!option.value) {
				this.customOptions.splice(i, 1);
			}
		}
	}
}

export {
	Option,
	CustomOption,
	Question,
	SingleChoiceQuestion,
	MultiChoiceQuestion,
}