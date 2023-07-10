
module.exports = {
	siteArea (data) {
		// Not working, no idea why
		return data.page.url.match(/^\/?([^/]+)/)?.[1] ?? "";
	}
};