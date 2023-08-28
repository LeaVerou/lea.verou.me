import { Question, SingleChoiceQuestion, MultiChoiceQuestion } from './models.js'

export default [
	new MultiChoiceQuestion({
		id: "interactive_elements",
		question: "Static site generators",
		description: "These generate a set of HTML files from data and templates, during a build step. The website is then served as a static site. Which have you used?",
		optionComments: false,
		allowCustom: true,
		options: [
			{
				"label": "🚫 None",
				"value": "none",
			},
			{
				"label": "Eleventy",
				"value": "eleventy",
			},
			{
				"label": "Gatsby",
				"value": "gatsby",
			},
			{
				"label": "Hugo",
				"value": "hugo",
			},
			{
				"label": "Jekyll",
				"value": "jekyll",
			},

		]
	}),
	new MultiChoiceQuestion({
		id: "pain_points",
		question: "What are your biggest pain points around making Web Components?",
		allowCustom: true,
		options: []
	}),
	new SingleChoiceQuestion({
		id: "gender",
		question: "Your gender:",
		allowCustom: true,
		options: [
			{
				"label": "🚫 Prefer not to say",
				"value": "na",
			},
			{
				"label": "Female",
				"value": "female",
			},
			{
				"label": "Male",
				"value": "male",
			},
			{
				"label": "Non-binary",
				"value": "nonbinary",
			}
		]
	})
];