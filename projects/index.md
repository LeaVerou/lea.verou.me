---
title: Projects
mavo: true
---

Here you'll find a list of tools I've developed over the years to make the lives of web designers & developers easier.
They are ordered mostly by release date, with those with the most impact featured first.

<div mv-app="projects" class="projects" mv-storage="https://github.com/leaverou/leaverou.github.io/data.json" mv-plugins="markdown">
	<h2>[count(project)] projects ([count(type = &quot;lib&quot;)] libraries and [count(type = &quot;app&quot;)] apps)</h2>
	<div mv-list>
		<article property="project" mv-multiple="" mv-list-item mv-order="desc" style="--featured-weight: [featured]" class="type-[type] [if(featured &gt; 0, &quot;featured&quot;)]">
			<span property="featured" mv-attribute="data-weight" mv-editor-type="range" mv-editor-min="0" mv-editor-max="5" mv-default="0">Featured</span>
			<a href="[url]" class="image-container"><img property="image"/></a>
			<div class="main-content">
				<span property="type" mv-options="lib: Library, app: App"></span>
				<h3>
					<a href="[url]" target="_blank" mv-attribute="none" property="name" rel="noopener"></a>
					<div class="released">Released in <time property="releaseDate" datetime="YYYY-MM" mv-default="[$today]"></time></div>
				</h3>
				<div property="description" class="markdown"></div>
			</div>
			<footer>
				<a property="url">[replace(url, &quot;https://&quot;)]</a>
				<a property="blogPost">Blog post</a>
				<a property="repo" href="https://github.com/[repo]" mv-attribute="none" target="_blank" rel="noopener"></a>
				<img src="https://img.shields.io/github/stars/[repo]?style=social" alt=""/>
			</footer>
		</article>
	</div>
</div>