import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
	  data() {
		return {
			questions: [
				{
					title: "Current UI"
				},
				{
					title: "Original proposal"
				},
				{
					title: "Hybrid"
				},
				{
					title: "Modified Sacha"
				}
			]
		};
	  },
}).mount(document.body);