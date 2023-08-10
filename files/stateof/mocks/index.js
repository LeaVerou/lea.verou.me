import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

globalThis.app = createApp({
	data() {
		return {
			mockup: 5,
			question: {
				selected_followups: new Set()
			},
			ui: {
				mockups: [
					{
						label: "None",
					},
					{
						label: "Macros",
						append: true,
					},
					{
						label: "Tags",
						select: true,
					},
					{
						label: "Hybrid",
						append: true,
						select: true,
					},
					{
						label: "In answer",
						select: true,
						in_answer: true,
					},
					{
						label: "In answer, sutble",
						select: true,
						in_answer: true,
						open_comment: false,
					}
				],
				options: [
					{
						icon: "🤷",
						label: "Never heard of it/Not sure what it is",
						value: "never_heard",
						sentiment: [ "Interested", "Not interested" ],
					},
					{
						icon: "✅",
						label: "Know what it is, but haven't used it",
						value: "heard",
						sentiment: [ "Want to try", "Not interested" ],
						issues: [
							"Browser support issues",
							"Haven’t needed it",
							"Cannot understand it"
						]
					},
					{
						icon: "👍",
						label: "I've used it",
						value: "used",
						sentiment: [ "Want to use again", "Don’t want to use again" ],
						issues: [
							"Hard to use",
							"Not powerful enough"
						]
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

		selected_sentiment() {
			let index = [...this.question.selected_followups].filter(i => i <= 1)[0];
			return this.selected_option?.sentiment?.[index];
		},

		selected_mockup () {
			return this.ui.mockups[this.mockup];
		},

		followups() {
			if (!this.selected_option) {
				return [];
			}

			let {sentiment, issues} = this.selected_option;
			return [...sentiment, ...(issues ?? [])];
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
		async pick_followup(followup, i, option) {
			let changed = this.pick_option(option);
			if (changed) {
				await nextTick();
			}
			let { append, select, in_answer, open_comment } = this.ui.mockups[this.mockup];

			if (open_comment !== false) {
				this.question.open_comment = true;
			}

			if (select) {
				if (this.question.selected_followups.has(i)) {
					// Unselect
					this.question.selected_followups.delete(i);
					return;
				}
				else {
					// Select
					this.question.selected_followups.add(i);
					// Sentiment is mutually exclusive
					if (i <= 1) {
						this.question.selected_followups.delete(i == 0 ? 1 : 0);
					}
				}
			}

			if (open_comment !== false) {
				await nextTick(); // wait for textarea to be shown

				let textarea = this.$refs.comment_area;
				// Append the followup to the textarea, in a way that doesn't destroy the undo history
				textarea.focus();

				if (append) {
					let textToInsert = `${ textarea.value && !textarea.value.endsWith("\n") ? "\n" : "" }- ${followup}`;

					// Remove existing unmodified insertions
					let regex = RegExp(`^- ${followup}\n`, "gm");
					if (regex.test(textarea.value)) {
						textarea.value = textarea.value.replace(regex, "");
					}

					// Insert followup
					document.execCommand('insertText', false, textToInsert);
				}
			}
		}
	},

	watch: {
		"question.answer"() {
			this.question.selected_followups.clear();

			if (this.selected_mockup.in_answer) {
				this.question.open_comment = false;
			}
		}
	}
}).mount(document.body);