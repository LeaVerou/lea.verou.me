---
title: Press
mavo: true
---

My work and/or opinions have been featured many times in leading industry publications, both online and printed.
The following is only a small sample of the mentions I managed to collect, **very infrequently updated**.

## Articles

<section class="press">
{% for article in press.articles %}
<article>
	<a class="article" href="{{ article.url }}">{{ article.title }}</a>
	<a class="venue" href="{{ article.venueUrl }}">{{ article.venue }}</a>
	<time datetime="{{ article.date }}">{{ article.date | format_date("short") }}</time>
</article>
{% endfor %}
</section>

## Newsletters

<div mv-app="newsletters" mv-storage="https://github.com/LeaVerou/leaverou.github.io/blob/master/data.json" mv-bar="no-login">
<div class="newsletter" property="newsletter" mv-multiple="">
<h3 id="[id]">[count(issue)]
<a property="url"><span property="name"></span></a> issues
</h3>
<meta property="id" mv-default="[idify(name)]"/>
<meta property="issueUrl"/>
<ul class="issues">
	<li class="issue" property="issue" mv-multiple="">
		<a href="[issueUrl][issue]">#<span property="issue"></span></a>
	</li>
</ul>
</div>
</div>