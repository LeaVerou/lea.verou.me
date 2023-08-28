// Some complexity here is due to the fact that we have separate base models that each prototype extends
// In the actual implementation in the survey, that separation is not needed
import * as Base from '../base-models.js'
import { delay, nextTick } from '../util.js';


class Option extends Base.Option {
	sentiment = 0;

	constructor(data, question) {
		super(data, question);

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
			// Give Vue time to propagate changes
			await nextTick();
		}

		if (this.sentiment === i) {
			// Clicking on selected sentiment should unselect it
			// Give Vue time to propagate changes
			await nextTick();
			await delay(0); // no idea 🤷🏽‍♀️
			this.sentiment = 0;
		}
		else {
			this.sentiment = i;
		}
	}

	_changed () {
		this.sentiment = 0;

		if (this.open_comment) {
			this.open_comment = false;
		}
	}

	get sentiment_label() {
		if (!this.selected || !this.sentiment) {
			return "";
		}

		let i = this.sentiment < 0? 1 : 0;
		return this.sentiments[i];
	}
}

export class Question extends Base.QuestionFactory(Option) {
	// Sentiment presets
	static SENTIMENTS_INTEREST = [ "Interested", "Not interested" ];
	static SENTIMENTS_TRY = [ "Want to try", "Not interested" ];
	static SENTIMENTS_USE = [ "Want to use again", "Don’t want to use again" ];
}

export const SingleChoiceQuestion = Base.SingleChoiceQuestionFactory(Question);
export const MultiChoiceQuestion = Base.MultiChoiceQuestionFactory(Question);