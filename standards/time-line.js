/**
 * WIP component for facilitating timeline lists
 * TODO:
 * - Mutation observer to react to changes in the timeline
 * - Customizable date format
 * - Customizable granularity (currently hardcoded to years)
 */

const styleURL = new URL("./time-line.css", import.meta.url);
const msInYear = 1000 * 60 * 60 * 24 * 365.25;

export default class TimeLine extends HTMLElement {
	#dl;
	#range;

	constructor () {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				@import url('${ styleURL }');
			</style>
			<div id="range"></div>
			<slot></slot>
		`;

		this.constructor.init();
	}

	// One-time initialization
	static init () {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		// Add global CSS to <head>
		document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${ styleURL }">`);
	}

	connectedCallback () {
		if (this.children.length === 0) {
			// Empty <time-line> is a no-op
			return;
		}

		this.#dl = this.querySelector("dl");
		this.#range = this.shadowRoot.querySelector("#range");

		if (!this.#dl || this.#dl.previousElementSibling || this.#dl.nextElementSibling || this.#dl.parentElement !== this) {
			console.warn("TimeLine component must contain a single <dl> element", this);
		}

		this.#processDates();
	}

	/**
	 * Process dates in the timeline and update range
	 */
	#processDates () {
		this.min = null;
		this.max = null;

		let lang = this.closest("[lang]")?.lang || "en";

		let times = this.querySelectorAll("time[datetime]");
		for (let time of times) {
			let date = getDate(time.getAttribute("datetime"));
			time.dateObject = date;

			if (!time.textContent) {
				// Format dates of empty <time> elements automatically
				// TODO read format from an attribute
				time.textContent = date.toLocaleString(lang, { month: "short", day: "numeric", year: "numeric" });
			}

			if (!this.min || date < this.min) {
				this.min = date;
			}

			if (!this.max || date > this.max) {
				this.max = date;
			}
		}

		let minYear = this.min.getFullYear();
		let maxYear = this.max.getFullYear();

		// Second pass, for things that require knowledge of min and max

		for (let time of times) {
			let year = time.dateObject.getFullYear();
			let subOffset = (time.dateObject - getDate(year + "-01-01")) / msInYear;
			time.style.setProperty("--offset", year - minYear);
			time.style.setProperty("--sub-offset", subOffset);
		}

		// Update range with current range of years
		let years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
		this.style.setProperty("--increments", years.length);
		this.#range.innerHTML = years.map(year => `<time datetime="${year}" class="increment" style="--offset: ${ year - minYear }">${year}</time>`).join("\n");
	}
}

function getDate (str) {
	let ret = new Date(str);
	// Adjust for timezone
	ret.setMinutes(ret.getMinutes() + ret.getTimezoneOffset());
	return ret;
}

customElements.define("time-line", TimeLine);