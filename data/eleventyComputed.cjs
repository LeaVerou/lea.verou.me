
module.exports = {
	oldURL (data) {
		let {site, page} = data;
		let path = page.url.replace("/blog/", "/").replace("/tag/", "/tags/");
		return site.old_domain + path;
	},

	siteArea (data) {
		return data.page.url.match(/^\/?([^/]+)/)?.[1] ?? "";
	}
};