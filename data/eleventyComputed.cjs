
module.exports = {
	oldURL (data) {
		let {site, page} = data;
		let url = page.url;
		let newURL = url.replace("/blog/", "/");
		if (url.startsWith("/blog/")) {
			if (url.startsWith("/blog/tags/")) {
				// Old tag URL format
				newURL = url.replace("/tags/", "/tag/");
			}
			else if (!/^\/blog\/($|\d{4}\/($|\d{2}\/)?)/.test(url)) {
				// New blog post, no corresponding old URL
				return "";
			}
		}

		return site.old_domain + newURL;
	},

	siteArea (data) {
		return data.page.url.match(/^\/?([^/]+)/)?.[1] ?? "";
	}
};