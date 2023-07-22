---
title: Credits & Making Of
---

<div class=nutshell>

This site would not have been possible without the help of many open source tools and services.
I'm grateful to all those who have contributed to these projects and made them available for others to use.

</div>

It uses a [JAMstack](https://www.jamstack.org) architecture.
It is built using [Eleventy](https://11ty.io) and lives on the [Netlify](https://www.netlify.com) platform.
It is delivered over HTTPS thanks to a free certificate from [Let's Encrypt](https://letsencrypt.org/),
automatically provisioned by [Netlify](https://www.netlify.com).
Before July 2023 it instead used a self-hosted [WordPress](https://wordpress.org/) instance,
which is still live at [lea0.verou.me](https://lea0.verou.me).
You can read about the migration [here](/blog/2023/going-lean/).

Other tools used include:
- [Bootstrap Icons](https://icons.getbootstrap.com) for icons
- The typography uses variable fonts exclusively:
- [Inter](https://rsms.me/inter/) for headings and certain small text, which was something I brought over from the WP site.
	It’s a beautiful sans-serif typeface by Rasmus Andersson, and has become my new favorite font, displacing my previous favorite for over a decade, Helvetica Neue.
- [Vollkorn](https://vollkorn-typeface.com) for body text, a beautiful serif Typeface by Friedrich Althausen.
- [Inconsolata](https://levien.com/type/myfonts/inconsolata.html) for code, a monospace font by Raph Levien.
- [PostCSS](https://postcss.org) with the [Nesting Plugin](https://www.npmjs.com/package/postcss-nesting) to use [CSS Nesting](https://drafts.csswg.org/css-nesting/) before it’s widely available in browsers ([though we’re getting there!](https://caniuse.com/css-nesting))
- [reading-time](https://www.npmjs.com/package/reading-time) to calculate the reading time of each post
- [eleventy-plugin-embed-everything](https://www.npmjs.com/package/eleventy-plugin-embed-everything) to embed content from other sites
- [eleventy-plugin-toc](https://www.npmjs.com/package/eleventy-plugin-toc) to generate a table of contents for each post
- [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) to automatically add anchors to headings
- [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs) to add attributes to markdown elements
- [plur](https://www.npmjs.com/package/plur) to pluralize words
- [concurrently](https://www.npmjs.com/package/concurrently) to run multiple npm scripts concurrently

<div class=note>

I can easily see this list getting out of date, so you may want to check out the [package.json]({{ site.repo_file }}/package.json) file for a more up-to-date list of dependencies.

</div>

## Licensing

The source code is available on [GitHub](https://github.com/{{ site.repo }}).
Feel free to look at over and borrow any techniques or code you like.

- The site **content** (`*.md` files and images in `/blog/`) is published under a [Creative Commons Attribution 3.0](http://creativecommons.org/licenses/by/3.0/) licence.
- The **code** (`*.js`, `*.cjs`, `*.njk`, `*.css` files) is published under an [MIT](http://opensource.org/licenses/MIT) licence.
- The **design** (logo, visual style etc) is (c) Lea Verou and may *not* be used without permission.
- Obviously, any code or assets not created by me are subject to their own license.

For more details and rationale, see [this post](/blog/2023/going-lean/#licensing).