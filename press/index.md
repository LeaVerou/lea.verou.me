---
title: Press
mavo: true
---



## Interviews

If you want to learn more about me, you could start by reading or watching
the many interviews I have given over the years, both in person and online.


<section class="press">
{% for article in press.interviews %}
<article>
	<a class="article" href="{{ article.url }}">
		{% if article.type %}<span class="type">[{{ article.type }}]</span>{% endif %}
		{{ article.title }}
	</a>
	<a class="venue" href="{{ article.venueUrl }}">{{ article.venue }}</a>
	<time datetime="{{ article.date }}">{{ article.date | format_date("medium") }}</time>
</article>
{% endfor %}
</section>

## Articles

My work and/or opinions have been featured many times in leading industry publications, both online and printed.
The following is a small sample of the mentions I managed to collect, **very infrequently updated**.

<section class="press">
{% for article in press.articles %}
<article>
	<a class="article" href="{{ article.url }}">{{ article.title }}</a>
	<a class="venue" href="{{ article.venueUrl }}">{{ article.venue }}</a>
	<time datetime="{{ article.date }}">{{ article.date | format_date("medium") }}</time>
</article>
{% endfor %}
</section>

## Newsletters

My work has been featured in nearly every front-end newsletter.
The following is a small, infrequently updated sample of the mentions I collected.

<div mv-app="newsletters" mv-storage="https://github.com/LeaVerou/leaverou.github.io/blob/master/data.json" mv-bar="no-login">
<details class="newsletter" property="newsletter" mv-multiple="">
<summary id="[id]">
	<strong>[count(issue)]</strong>
	<a property="url" target="_blank"><span property="name"></span></a> issues
</summary>
<meta property="id" mv-default="[idify(name)]"/>
<meta property="issueUrl"/>
<ul class="issues">
	<li class="issue" property="issue" mv-multiple="">
		<a href="[issueUrl][issue]">#<span class="issue-number" property="issue"></span></a>
	</li>
</ul>
</details>
</div>