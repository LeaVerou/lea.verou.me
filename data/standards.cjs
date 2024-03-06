const browsers = require("./browsers.json");
const proposals = [
	{
		title: "Relaxed CSS Nesting Syntax",
		description: `Drove several milestones to progressively refine and simplify the syntax in a way that prioritizes user needs
		by reducing boilerplate and thus inreasing efficiency, readability, and reducing error-proneness.`,
		status: "shipped-baseline",
		parts: [
			{
				title: "Interim syntax",
				status: "superseded",
				description: `This was originally known as “Lea’s proposal”, and later “Option 3”.

				This was a proposal for a CSS nesting syntax that would get us halfway to North Star syntax.
				It significantly reduced the use cases that had to explicitly include a nesting selector (\`&\`)`,
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
				title: "North Star syntax",
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
				date: "2019-06-05"
			},
			{
				type: "specced",
				by: "me",
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
				by: "me",
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
				by: "me",
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
		title: "A pseudo-class to reduce specificity: \`:where()\`",
		description: `\`:where()\` was a new pseudo-class that allows
		CSS authors to include querying criteria in their selectors without affecting specificity (the selector score that determines precedence).`,
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
		title: "CSS Trigonomeric functions",
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
		title: "Auto-sizing form elements (now \`field-sizing\`)",
		description: `A way to specify that form elements should be sized by their input value.
		This is a big pain point for authors, as it is very commonly needed (especially for multiline text fields),
		and quite tricky to implement manually.`,
		milestones: [
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/7552",
				date: "2022-08-01"
			}
		]
	},
	{
		title: "CSS-wide color interpolation handling",
		description: `Defined the \`in <space>\` token used across CSS to specify a color space for color interpolation,
		and specified defaults.`,
		milestones: [
			{
				type: "specced",
				by: "me",
				url: "https://github.com/w3c/csswg-drafts/commit/3efd360d4e13227ef9b3c0466bc0296028ae5b2b",
				date: "2021-11-01"
			},
			{
				type: "proposal",
				url: "https://github.com/w3c/csswg-drafts/issues/7948",
				date: "2022-10-24"
			},
			{
				type: "resolution",
				date: "2023-03-22"
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
		description: `Perhaps my first CSS proposal.
		Relaxed the syntax of \`box-shadow\` to minimize author errors.
		Gave birth to one of CSS’s design principles, dubbed ["Lea Verou reordering principle"](https://wiki.csswg.org/ideas/principles?s[]=reordering).`,
		milestones: [
			{
				type: "proposal",
				url: "https://lists.w3.org/Archives/Public/www-style/2012Oct/0313.html",
				date: "2012-10-12"
			}
		]
	},
	{
		title: "`contrast-color()` MVP",
		description: `Automatically generating contrasting colors is a big author pain point, but discussusions around fleshing out a full \`contrast-color()\` function were taking too long.
		I proposed an MVP that would cover the most common use cases, and got it accepted.
		While I did not initially propose \`contrast-color()\`, I drove aggressively reducing scope to facilitate shipping an MVP that would cover >80% of use cases.`,
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
				by: "me",
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
		title: "Easy continuous image borders via `background-clip: border-area;`",
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
		title: "Easy arbitrary rounded polygons, via rounding parameters in `polygon()`",
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
		title: "Simplify value clamping in one direction by allowing `none` values for `clamp()`",
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
			}
		]
	},
	{
		title: "`stripes()`",
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
		title: "`::tooltip`",
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
		title: "`inherit()`",
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
				title: "Second WG resolution (naming & scope reduction)",
				url: "https://github.com/w3c/csswg-drafts/issues/2864#issuecomment-1645794662",
				date: "2023-07-21"
			}
		]
	},
	{
		title: "`@image`",
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
		title: "Conditionless CQs",
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
	}
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

walkStandards(proposal => {
	proposal.status ??= getStatus(proposal);

	for (let milestone of proposal.milestones) {
		if (milestone.browser && !milestone.date) {
			milestone.date = browsers[milestone.browser][milestone.version];
		}
	}
});

function getStatus (tech) {
	if (!tech || !tech.milestones) {
		return "unknown";
	}

	let relevantMilestones = tech.milestones.filter(m => relevantStatuses.includes(m.type));
	let statuses = new Set(relevantMilestones.map(m => m.type));

	if (statuses.has("shipped")) {
		// Find what kind of shipped
		let shippedMilestones = relevantMilestones.filter(m => m.type === "shipped");
		let shippedNoFlag = shippedMilestones.filter(m => !m.flag);

		if (shippedNoFlag.length === 0) {
			// Only shipped under a flag
			return "shipped-flag";
		}

		// Could it be baseline?
		let browsers = new Set(shippedNoFlag.map(m => m.browser));
		if (browsers.has("chrome") && browsers.has("firefox") && browsers.has("safari")) {
			return "shipped-baseline";
		}

		return "shipped";
	}
	else {
		return relevantStatuses.find(s => statuses.has(s));
	}
}

module.exports = proposals;