import { Question, SingleChoiceQuestion, MultiChoiceQuestion } from './models.js'

export default [
	new SingleChoiceQuestion({
		id: "aspect_ratio",
		question: "Popover API",
		description: "HTML syntax and JS API facilitating popovers such as overlays, popups, menus etc.",
		code_example: `<pre><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">"foo"</span>&gt;</span>Toggle the popover<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"foo"</span> <span class="hljs-attr">popover</span>&gt;</span>Popover content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>`,
		options: [
			{
				icon: "🤷",
				label: "Never heard of it",
				value: "never_heard",
				sentiments: Question.SENTIMENTS_INTEREST,
			},
			{
				icon: "👀",
				label: "Heard of it",
				value: "heard",
				sentiments: Question.SENTIMENTS_TRY,
			},
			{
				icon: "🤓",
				label: "Used it",
				value: "used",
				sentiments: Question.SENTIMENTS_USE,
			},
		]
	}),
	new MultiChoiceQuestion({
		id: "interactive_elements",
		question: "Which of the following elements have you used?",
		sentiments: Question.SENTIMENTS_USE,
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
				"sentiments": null
			}
		]
	}),
];