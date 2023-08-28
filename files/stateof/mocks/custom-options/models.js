import * as Base from '../base-models.js'

export const Option = Base.Option;

export class CustomOption {
	value = "";
	active = false;

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

	get_label(i) {
		let ret;

		if (this.question.options.length > 0) {
			// Has predefined answers
			ret = i == 0 ? "Custom answer" : "Another custom answer";
		}
		else {
			// Freeform list, no predefined answers
			ret = `Item #${ i + 1 }`;
		}

		if (this.question.maxCustomCount) {
			ret += ` (up to ${ this.question.maxCustomCount } total)`;
		}

		return ret;
	}

	toJSON () {
		let ret = {...this};
		// Prevent cyclical structure errors
		delete ret.question;
		return ret;
	}
}

export class Question extends Base.Question {
	customOptions = this.allowCustom ? [new CustomOption(this)] : [];
}

export class SingleChoiceQuestion extends Base.SingleChoiceQuestionFactory(Question) {
	custom_option_changed (i) {
		let customOption = this.customOptions[i].value;

		if (customOption) {
			this.answer = "custom";
		}
	}
}

export class MultiChoiceQuestion extends Base.MultiChoiceQuestionFactory(Question) {
	constructor (data) {
		super(data);

		if (this.allowCustom && this.initialCustomCount > 1) {
			this.customOptions.push(...Array(this.initialCustomCount - 1).fill(1).map(_ => new CustomOption(this)));
		}
	}

	get longform () {
		// If no predefined answers, we assume this is a freeform list
		// and would benefit from more space to enter answers
		// In the future we may want to make this configurable
		// and just default to this when it's not set
		return this.options.length === 0;
	}

	custom_option_changed (i) {
		let option = this.customOptions[i];
		let nextOption = this.customOptions[i + 1];

		if (option.value && !nextOption) {
			this.add_custom_option();
		}
	}

	add_custom_option (i = this.customOptions.length) {
		if (!this.maxCustomCount || this.customOptions.length < this.maxCustomCount) {
			let option = new CustomOption(this);
			this.customOptions.splice(i, 0, option);
			return option;
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