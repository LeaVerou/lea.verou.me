import { Question, SingleChoiceQuestion, MultiChoiceQuestion } from './models.js'

export default [
	new SingleChoiceQuestion({
		id: "aspect_ratio",
		question: "<code>aspect-ratio</code>",
		code_example: `<pre><code><span class="hljs-selector-class">.square</span> {
aspect-ratio: <span class="hljs-number">1</span> / <span class="hljs-number">1</span>;
}</code></pre>`,
		options: [
			{
				icon: "🤷",
				label: "Never heard of it",
				value: "never_heard",
				sentiment: Question.SENTIMENT_INTEREST,
			},
			{
				icon: "👀",
				label: "Heard of it",
				value: "heard",
				sentiment: Question.SENTIMENT_TRY,
			},
			{
				icon: "🤓",
				label: "Used it",
				value: "used",
				sentiment: Question.SENTIMENT_USE,
			},
		]
	}),
	new MultiChoiceQuestion({
		id: "interactive_elements",
		question: "Which of the following elements have you used?",
		sentiment: Question.SENTIMENT_USE,
		optionComments: false,
		options: [
			{
				"label": "<code>&lt;details></code>",
				"value": "details",
			},
			{
				"label": "<code>&lt;dialog></code>",
				"value": "dialog",
			},
			{
				"label": "<code>&lt;form></code>",
				"value": "form",
			},
			{
				"label": "<code>&lt;input></code>",
				"value": "input",
			},
			{
				"label": "None of the above",
				"value": "none",
				"sentiment": null
			}
		]
	}),
];