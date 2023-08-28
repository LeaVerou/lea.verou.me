/**
 * Base Models for the questions and options used across these prototypes.
 * Prototypes can either import one from here or define their own.
 *
 * If prototypes define their own Option class, they need to also use the factories for Question and its subclasses,
 * to make sure they use the correct objects. Same if they define their own Question class.
 *
 * Note that these combine all state in the same object:
 * permanent (e.g. question description) vs ephemeral (e.g. active option),
 * user state (e.g. selected option) vs survey state (e.g. question description).
 * This is fine for a prototype, but we may want to separate these down the line.
 */

export class Option {
	_selected = false;

	constructor(data, question) {
		Object.assign(this, data);
		this.question = question;
	}

	set selected (selected) {
		let oldSelected = this._selected;

		this._selected = selected;

		if (oldSelected !== selected) {
			// This is a hack, ideally we need a proper pub/sub system here
			// EventTarget can't be used with Vue (see https://github.com/vuejs/core/issues/9037)
			// but should be fine for React
			this._changed(this);
			this.question._changed(this);
		}
	}

	get selected() {
		return this._selected;
	}

	_changed () {}

	toJSON () {
		let ret = {...this};
		// Prevent cyclical structure errors
		delete ret.question;
		return ret;
	}
}

export function QuestionFactory (Option) {
	return class Question {
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
}

export function SingleChoiceQuestionFactory (Question) {
	return class SingleChoiceQuestion extends Question {
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
}

export function MultiChoiceQuestionFactory (Question) {
	return class MultiChoiceQuestion extends Question {
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
}

export const Question = QuestionFactory(Option);
export const SingleChoiceQuestion = SingleChoiceQuestionFactory(Question);
export const MultiChoiceQuestion = MultiChoiceQuestionFactory(Question);