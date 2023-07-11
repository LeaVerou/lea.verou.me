
module.exports = {
	siteArea (data) {
		return data.page.url.match(/^\/?([^/]+)/)?.[1] ?? "";
	}
};