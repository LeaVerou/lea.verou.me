const browsers = require("./browsers.json");
const proposals = [
	{
		id: "relaxed-css-nesting",
		title: "Relaxed CSS Nesting Syntax",
		description: `Drove several milestones to progressively refine and simplify the syntax in a way that prioritizes user needs
		by reducing boilerplate and thus inreasing efficiency, readability, and reducing error-proneness.`,
		status: "shipped-baseline",
		parts: [
			{
				title: "Interim syntax",
				status: "superseded",
				description: `
				This was a proposal for a simplified CSS nesting syntax
				that significantly reduced the use cases that had to explicitly include a nesting selector (\`&\`).
				It was also fully compatible with the North Star syntax, and basically got us halfway there.
				Originally known as _“Lea’s proposal”_, and later as _“Option 3”_ due to its position in the [pros & cons table](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md).`,
				milestones: [
					{
						type: "proposal",
						url: "https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1272373216",
						date: "2022-10-08"
					},
					{
						type: "resolution",
						url: "https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1378013329",
						date: "2023-01-10"
					},
					{
						type: "specced",
						url: "https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1293948163",
						by: "Tab & Adam",
						date: "2023-08-06"
					},
					{
						type: "shipped",
						browser: "chrome",
						version: "112",
						date: "2023-04-03"
					},
					{
						type: "shipped",
						browser: "safari",
						version: "16.5",
						date: "2023-05-17"
					}
				],
				note: "Note: Firefox shipped the North Star syntax directly (see below), without shipping the interim syntax."
			},
			{
				title: "North Star CSS Nesting Syntax",
				description: `This was the ideal syntax where the nesting selector (\`&\`) is only needed to express user intent,
				and never for technical reasons.
				We knew all along that this was the ideal syntax, but for many years it was considered infeasible.`,
				milestones: [
					{
						type: "proposal",
						url: "https://github.com/w3c/csswg-drafts/issues/7961",
						date: "2022-10-26"
					},
					{
						title: "Feasibility confirmed for Chrome",
						by: "andruud",
						url: "https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1489883575",
						date: "2023-03-30"
					},
					{
						type: "resolution",
						url: "https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1514955984",
						date: "2023-04-19"
					},
					{
						type: "specced",
						by: "Tab",
						url: "https://github.com/w3c/csswg-drafts/commit/ea43cbf4474e7d16364064f70abe9c6b83bb248b",
						date: "2023-05-12"
					},
					{
						type: "shipped",
						browser: "firefox",
						version: "117",
						date: "2023-08-23"
					},
					{
						type: "shipped",
						browser: "chrome",
						version: "120",
						date: "2023-12-07"
					},
					{
						type: "shipped",
						browser: "safari",
						version: "17.2",
						date: "2023-12-10"
					}
				]
			}
		]
	},
	{
		title: "Relative Colors",
		description: `Adds the capability of creating new colors by tweaking the components of existing colors in any color space,
		to facilitate dynamic design systems that generate several hues and tints from a few input colors.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499126198",
				date: "2018-10-01"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499206254",
				date: "2019-06-05"
			},
			{
				type: "specced",
				url: "https://github.com/w3c/csswg-drafts/commit/a7dbe90440958c46c0eae27cb1c46ebe4ce6e361",
				date: "2019-12-20"
			},
			{
				type: "shipped",
				browser: "safari",
				version: "16.4",
				date: "2023-03-26"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "118",
				flag: true,
				date: "2023-10-09"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "119",
				date: "2023-10-30"
			},
			{
				title: "Interop 2024 focus area",
				url: "https://web.dev/blog/interop-2024",
				date: "2024-02-01"
			}
		]
	},
	{
		title: "Conical gradients",
		description: `Conical gradients are a type of gradient that allows for smooth color transitions around a center point.

		Possibly my earliest proposal that actually got implemented in browsers.`,
		milestones: [
			{
				type: "proposal",
				url: "https://lists.w3.org/Archives/Public/www-style/2011Mar/0472.html",
				date: "2011-03-21"
			},
			{
				type: "specced",
				url: "https://lea.verou.me/specs/conical-gradient/",
				date: "2011-11-22"
			},
			{
				type: "specced",
				title: "Refined spec and integrated to CSS Images",
				by: "Tab",
				url: "https://www.w3.org/TR/css-images-4/#conic-gradients",
				date: "2012"
			},
			{
				title: "Polyfill",
				url: "https://lea.verou.me/blog/2015/06/conical-gradients-today/",
				date: "2015-06-18"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "69",
				date: "2018-09-03"
			},
			{
				type: "shipped",
				browser: "safari",
				version: "12.1",
				date: "2019-03-24"
			},
			{
				type: "shipped",
				browser: "firefox",
				version: "83",
				date: "2020-11-16"
			}
		]
	},
	{
		id: "where",
		title: "Decouple selector logic from specificity (\`:where()\`)",
		description: `
			Traditionally, CSS included a heuristic that inferred selector importance from its querying logic.
			Often this inference was wrong, and authors had little recourse, giving rise to patterns like [BEM](http://getbem.com/)
			that avoided the issue by giving up on most querying logic altogether.
			\`:where()\` was a new pseudo-class that allows
			CSS authors to include querying criteria in their selectors without affecting specificity (the selector score that determines precedence),
			decoupling the two.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/1170",
				date: "2017-04-04"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/1170#issuecomment-342645651",
				date: "2017-11-07"
			},
			{
				title: "Naming resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/2143#issuecomment-432303830",
				date: "2018-10-23"
			},
			{
				type: "shipped",
				browser: "firefox",
				version: "78",
				date: "2020-06-29"
			},
			{
				type: "shipped",
				browser: "safari",
				version: "14",
				date: "2020-09-15"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "88",
				date: "2021-01-18"
			}
		]
	},
	{
		title: "CSS Trigonometric functions",
		description: `Adds trigonometric functions to CSS, to facilitate the creation of complex shapes and animations.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/2331",
				date: "2018-02-17"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/2331#issuecomment-467990627",
				date: "2019-02-27"
			},
			{
				type: "specced",
				by: "Tab",
				url: "https://github.com/w3c/csswg-drafts/commit/b8935e7df14ed544c51a991cf10f15bf077eb603",
				date: "2019-03-25"
			},
			{
				type: "shipped",
				browser: "safari",
				version: "15.4",
				date: "2022-03-13"
			},
			{
				type: "shipped",
				browser: "firefox",
				version: "108",
				date: "2022-12-12"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "111",
				date: "2023-03-06"
			}
		]
	},
	{
		title: "Auto-size text fields and dropdowns",
		description: `A way to specify that form elements should be sized by their input value.
		This is a big pain point for authors, as it is very commonly needed
		and quite tricky to implement manually.`,
		milestones: [
			{
				type: "proposal",
				title: "Initial proposal for `<textarea>`",
				by: "Ian Kilpatrick",
				url: "https://github.com/w3c/csswg-drafts/issues/7542",
				date: "2022-07-28"
			},
			{
				type: "proposal",
				title: "Proposal to extend to `<input>` and `<select>`",
				url: "https://github.com/w3c/csswg-drafts/issues/7552",
				date: "2022-08-01"
			},
			{
				type: "specced",
				by: "Florian & Kent Tamura",
				url: "https://github.com/w3c/csswg-drafts/commit/97a360ac1a9f514305b072f81e1171dec14e11db",
				date: "2023-10-27"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "119",
				flag: true,
			},
			// {
			// 	type: "shipped",
			// 	browser: "chrome",
			// 	version: "123",
			// }
		]
	},
	{
		id: "in-space",
		status: "shipped-baseline",
		title: "CSS-wide syntax for color interpolation",
		description: `Defined the syntax used across CSS to specify how color interpolate.
		It is currently used in \`color-mix()\` and gradients, and soon in transitions, animations, and more.`,
		tags: ["Color"],
		milestones: [
			{
				type: "specced",
				url: "https://github.com/w3c/csswg-drafts/commit/3efd360d4e13227ef9b3c0466bc0296028ae5b2b",
				date: "2021-11-01"
			},
		]
	},
	{
		id: "oklab-default",
		title: "Use OKLab for gradient color interpolation by default",
		tags: ["Minor feature", "Color"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/7948",
				date: "2022-10-24"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/7948#issuecomment-1479941072",
				date: "2023-03-22"
			},
			{
				type: "specced",
				by: "Chris Lilley",
				url: "https://github.com/w3c/csswg-drafts/commit/cc85d46b321003cc3849bd028ed5280a4e71c82b",
				date: "2023-07-05"
			}
		]
	},
	{
		title: "`caret-color`",
		description: "`caret-color` is a property that allows authors to customize the color of the text input caret.",
		milestones: [
			{
				type: "proposal",
				url: "https://lists.w3.org/Archives/Public/www-style/2011Nov/0772.html",
				date: "2011-11-29"
			},
			{
				type: "resolution",
				url: "https://lists.w3.org/Archives/Public/www-style/2014Oct/0260.html",
				date: "2014-09-08"
			},
			{
				type: "shipped",
				browser: "chrome",
				version: "57",
				date: "2017-03-08"
			},
			{
				type: "shipped",
				browser: "firefox",
				version: "53",
				date: "2017-04-18"
			},
			{
				type: "shipped",
				browser: "safari",
				version: "11.1",
				date: "2018-03-28"
			}
		]
	},
	{
		title: "Relaxed `box-shadow` syntax",
		status: "shipped-baseline",
		description: `One of my first web standards proposals.
		Relaxed the syntax of \`box-shadow\` to minimize author errors.
		Gave birth to one of CSS’s design principles, which Elika called ["Lea Verou reordering principle"](https://wiki.csswg.org/ideas/principles?s[]=reordering).`,
		tags: ["Minor feature"],
		milestones: [
			{
				type: "proposal",
				url: "https://lists.w3.org/Archives/Public/www-style/2012Oct/0313.html",
				date: "2012-10-12"
			}
		]
	},
	{
		title: "Color API",
		description: `A proposal for a \`Color\` object API for the web platform.
		The purpose is twofold: to give APIs a way to represent color inputs and outputs that does not depend on strings, and to give authors a way to manipulate colors.`,
		tags: ["JS", "Color"],
		milestones: [
			{
				type: "proposal",
				url: "https://lists.w3.org/Archives/Public/www-archive/2021Jul/att-0004/Towards_a_Color_API_for_the_Web_Platform.pdf",
			},
			{
				type: "resolution",
				url: "https://lists.w3.org/Archives/Public/www-style/2021Jul/0012.html",
				date: "2021-07-26",
			},
			{
				type: "specced",
				title: "Initial spec draft",
				by: "me & Chris Lilley",
				url: "https://github.com/wicg/color-api",
				date: "2021-05-24",
			}
		]
	},
	{
		title: "`contrast-color()` MVP",
		description: `Automatically generating contrasting colors is a big author pain point, but discussusions around fleshing out a full \`contrast-color()\` function were taking too long.
		I proposed an MVP that would cover the most common use cases, and got it accepted.
		While I did not initially propose \`contrast-color()\`, I drove aggressively reducing scope to facilitate shipping an MVP that would cover >80% of use cases.`,
		tags: ["a11y", "Color", "MVP"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9166",
				date: "2023-08-06"
			},
			{
				title: "Tweak",
				by: "Tab & Nicole",
				url: "https://github.com/w3c/csswg-drafts/issues/9166#issuecomment-1708978105",
				date: "2023-09-06"
			},
			{
				type: "specced",
				url: "https://github.com/w3c/csswg-drafts/commit/39f469149abb5575505b6d2d54b8bddf119f896d",
				date: "2024-02-16"
			}
		]
	},
	{
		title: "Simplified `:local-link`",
		description: `This addresses the common author pain point of styling links to the current page (e.g. in a navigation menu)
		in a different way.
		It built on an existing proposal that had been removed,
		but simplified it to cover the most common use cases without the complexity of the previous proposal.`,
		tags: ["Selectors"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/2010",
				date: "2017-11-24"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/2010#issuecomment-355167067",
				date: "2018-01-03"
			},
			{
				type: "specced",
				by: "Elika",
				url: "https://github.com/w3c/csswg-drafts/commit/e3093cf48c8fd26f90c4def71d587bfeff780243"
			}
		]
	},
	{
		title: "Continuous image borders",
		description: `Address a common pain point by adding a \`border-area\` keyword to \`background-clip\``,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9456",
				date: "2023-10-11"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/9456#issuecomment-1944470563",
				date: "2023-02-14"
			}
		]
	},
	{
		title: "Arbitrary rounded polygons",
		description: `This proposal allows authors to add rounding to arbitrary polygon shapes, addressing a common pain point that previously required pre-generated images`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9843",
				date: "2024-01-23"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/9843#issuecomment-1944485653",
				date: "2024-02-14"
			}
		]
	},
	{
		title: "Value clamping in one direction",
		description: "…by allowing `none` values for `clamp()`",
		tags: ["Minor feature"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9713",
				date: "2023-12-15"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/9713#issuecomment-1944449961",
				date: "2024-02-14"
			},
			{
				type: "specced",
				by: "Tab",
				url: "https://github.com/w3c/csswg-drafts/commit/393a7fcdf641c5031fbd143a02f3d3fa9ff7ead8",
				date: "2024-03-07"
			}
		]
	},
	{
		title: "Multi-color borders via `stripes()`",
		description: `This is a reusable primitive that was designed to allow borders of multiple colors,
		something that was requested by accessiblity groups.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/2532",
				date: "2018-04-11"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/2532#issuecomment-402327492",
				date: "2018-07-03"
			},
			{
				type: "specced",
				by: "Sebastian",
				date: "2023-07-27"
			}
		]
	},
	{
		title: "Tooltip styling (`::tooltip`)",
		description: `Styling tooltips in a custom way is a huge author pain point.
		Since browser-generated tooltips cannot be styled, authors end up having to recreate the tooltip functionality entirely from scratch,
		with significantly worse DX and accessibility.
		This proposal would allow browser-generated tooltips to be styled in a limited way.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/8930",
				date: "2023-08-06"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/8930#issuecomment-1644333441",
				date: "2023-07-20"
			}
		]
	},
	{
		title: "Reading parent values of arbitrary CSS properties via `inherit()`",
		description: `Allow authors to read arbitary properties from their parent and use them in calculations, solving several diverse use cases at once.`,
		tags: ["Web Components"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/2864",
				date: "2018-07-02"
			},
			{
				type: "resolution",
				url: "https://lists.w3.org/Archives/Public/www-style/2021May/0012.html",
				date: "2021-04-08"
			},
			{
				type: "resolution",
				title: "Second WG resolution (naming & MVP)",
				url: "https://github.com/w3c/csswg-drafts/issues/2864#issuecomment-1645794662",
				date: "2023-07-21"
			}
		]
	},
	{
		title: "`@image`",
		description: `A new at-rule to define and manipulate images in CSS, solving several image-related pain points at once.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/6807",
				date: "2021-08-06"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/6807#issuecomment-1248380039",
				date: "2022-09-15"
			}
		]
	},
	{
		title: "`color-extract()`",
		description: `A function to extract individual color components (e.g. lightness) from an arbitrary CSS color, facilitating the creation of dynamic design systems.`,
		tags: ["Color"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/6937",
				date: "2022-01-09"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/6937#issuecomment-1011307383",
				date: "2022-01-12"
			}
		]
	},
	{
		title: "Conditionless container queries",
		description: `Make the query part of container queries optional.`,
		tags: ["Minor feature"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9192",
				date: "2023-08-15"
			},
			{
				type: "resolution",
				url: "https://github.com/w3c/csswg-drafts/issues/9192#issuecomment-1789850349",
				date: "2023-11-01"
			}
		]
	},
	{
		id: "var-groups",
		title: "CSS Variable Groups",
		tags: ["Design systems", "Web Components", "Color"],
		description: `A way to group related variables and pass them around, to make it less painful to write CSS for design systems and to integrate third-party components.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/9992",
				date: "2024-02-23"
			}
		]
	},
	{
		id: "color-scale",
		title: "CSS Color Scales",
		tags: ["Design systems", "Color"],
		description: `A way to define continuous color scales in CSS and pick arbitrary colors on them, to facilitate the creation of dynamic design systems.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/10034",
				date: "2024-03-05"
			}
		]
	},
	{
		id: "element-refs",
		title: "Improve DX of element reference attributes by allowing relative references instead of only ids",
		description: `An attempt to improve usability of HTML across several APIs by improving the ergonomics of how an element can reference another.`,
		tags: ["HTML", "Web Components", "a11y"],
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/whatwg/html/issues/10143",
				date: "2024-02-18"
			}
		]
	},
	{
		id: "custom-attributes",
		title: "Custom attributes",
		description: "An ambitious attempt to solve several web components pain points at once",
		tags: ["Web Components"],
		milestones: [
			{
				type: "proposal",
				title: "Original proposal (naming only)",
				url: "https://github.com/whatwg/html/issues/2271",
				date: "2017-01-17"
			},
			{
				type: "proposal",
				url: "https://github.com/WICG/webcomponents/issues/1029",
				date: "2023-09-13"
			}
		]
	}
	// TODO custom attributes
];

const relevantStatuses = ["shipped", "specced", "resolution", "proposal"];

function walkStandards (callback) {
	for (let standard of proposals) {
		if (standard.parts) {
			for (let part of standard.parts) {
				callback(part);
			}
		}
		else {
			callback(standard);
		}
	}
}

function getDate (str) {
	let ret = new Date(str);
	// Adjust for timezone
	ret.setMinutes(ret.getMinutes() + ret.getTimezoneOffset());
	return ret;
}

let statuses = ["shipped-baseline", "shipped", "shipped-flagged", "specced", "resolution", "proposal"];

walkStandards(proposal => {
	proposal.id ??= proposal.title.toLowerCase().replace(/[^\w]+/g, " ").trim().replace(/\s+/g, "-");
	proposal.keyDates = {};
	proposal.shipped_in = new Set();

	// Add browser release dates where missing
	for (let milestone of proposal.milestones) {
		if (milestone.browser && !milestone.date) {
			milestone.date = browsers[milestone.browser][milestone.version];
		}

		if (!milestone.date) {
			continue;
		}

		if (!relevantStatuses.includes(milestone.type)) {
			continue;
		}

		let date = getDate(milestone.date);

		let key = milestone.type;
		if (milestone.type === "shipped") {
			key = milestone.flag ? "shipped-flagged" : "shipped";
			if (milestone.flag) {
				if (proposal.shipped_in.size > 0) {
					// If it shipped unflagged in a browser before this, we don't have this status in the timeline
					continue;
				}

				key = "shipped-flagged";
			}
			else {
				proposal.shipped_in.add(milestone.browser);
			}

			// Baseline = shopped in all three browsers unflagged
			if (proposal.shipped_in.size >= 3) {
				key = "shipped-baseline";
			}
		}

		if (!proposal.keyDates[key] || proposal.keyDates[key] > date) {
			proposal.keyDates[key] = date;
		}

		if (!proposal.minDate || date < proposal.minDate) {
			proposal.minDate = date;
		}

		if (!this.maxDate || date > proposal.maxDate) {
			proposal.maxDate = date;
		}
	}

	// Find best status that applies
	proposal.status ??= statuses.find(s => s in proposal.keyDates);

	// Sort key dates by date, drop empty dates, and convert to array
	proposal.keyDates = Object.entries(proposal.keyDates)
		.filter(([k, v]) => v)
		.map(([k, v]) => ({status: k, date: v}))
		.sort((a, b) => a.date - b.date);
});

module.exports = proposals;