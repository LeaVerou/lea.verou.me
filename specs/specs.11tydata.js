export default {
	eleventyComputed: {
		is_spec: data => data.tags.includes("spec"),
	},
};