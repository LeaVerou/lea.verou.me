import matchHelper from "posthtml-match-helper";

/**
 * PostHTML plugin to add a footnote text right after its reference.
 * The text is added as a `<span>` element with the "footnote-text" class right after the footnote reference.
 * Both the footnote reference and the text are enclosed in a container element (`span.footnote-container`) to allow positioning footnote text in a pop-up next to the ref.
 * Every footnote reference becomes a position anchor for the corresponding footnote.
 * The list of all footnotes in a blog post is preserved but wrapped in a `<details>` element with the footnote count as a summary.
 * Improves the overall a11y by adding appropriate ARIA roles and labels.
 *
 * @param {Record<string, any>} [options]
 * @returns {Function} PostHTML plugin function
 */
export default function footnotesPostHTMLPlugin (options = {}) {
	return function (tree) {
		// One per page
		let footnotes = new Map(); // id -> content
		let processedNodes = new Set();

		tree.match(matchHelper(".footnotes-list"), function (node) {
			if (processedNodes.has(node)) {
				// Skip
				return node;
			}

			// Add ARIA role to the footnotes list
			node.attrs.role = "doc-endnotes";

			let footnoteNodes = node.content.filter((n) => n.tag === "li");
			let footnoteCount = footnoteNodes.length;

			// Add ARIA role to each footnote
			for (let footnote of footnoteNodes) {
				footnote.attrs.role = "doc-footnote";

				// Add ARIA role to backref link
				let content = footnote.content;
				while (content) {
					let anchor = content.find(
						(n) =>
							n.tag === "a" && n.attrs?.class?.includes("footnote-backref"),
					);

					if (anchor) {
						anchor.attrs.role = "doc-backlink";
						anchor.attrs["aria-label"] = "Back to content";
						break;
					}
					else {
						// Dive deeper
						content = content.find((n) => Array.isArray(n.content))?.content;
					}
				}
			}

			processedNodes.add(node);

			// Wrap footnotes list in a <details> element
			return {
				tag: "details",
				content: [
					{
						tag: "summary",
						content: `${footnoteCount}&nbsp;${footnoteCount > 1 ? "footnotes" : "footnote"}`,
					},
					node,
				],
			};
		});

		tree.match(matchHelper(".footnote-item"), function (node) {
			// Clone content to avoid modifying the original node (we should keep it as-is in the footnotes list)
			let content = structuredClone(node.content);

			// Remove newlines
			content = content.filter((n) => n !== "\n");

			// Remove redundant `<p>` wrapper if it's the only child
			if (content.length === 1 && content[0]?.tag === "p") {
				content = content[0].content;
			}

			// Remove backref link
			content = content.filter((node) => {
				if (node.attrs?.class?.includes("footnote-backref")) {
					return false;
				}

				return true;
			});

			footnotes.set(node.attrs.id, {
				tag: "span",
				attrs: {
					role: "doc-footnote",
					tabindex: "0",
					class: "footnote-text",
					style: `position-anchor: --footnote-${node.attrs.id}`,
				},
				content,
			});

			return node;
		});

		if (footnotes.size) {
			tree.match(matchHelper(".footnote-ref"), function (node) {
				if (processedNodes.has(node)) {
					// Skip
					return node;
				}

				let anchor = node.content?.find?.((n) => n.tag === "a");
				anchor.attrs.role = "doc-noteref";
				let id = anchor.attrs.href.match(/(?<=#).+/)?.[0]; // everything after "#"
				if (!id) {
					// Should not happen
					return node;
				}

				node.attrs.style = `anchor-name: --footnote-${id}`;

				// Returning "node" as a part of a new tree node causes its re-matching and, as a result, infinite recursion.
				// We need to prevent it
				processedNodes.add(node);

				// Add a footnote text right after its reference and put both inside a container element
				return {
					tag: "span",
					attrs: {
						class: "footnote-container",
					},
					content: [node, footnotes.get(id)],
				};
			});
		}

		return tree;
	};
}
