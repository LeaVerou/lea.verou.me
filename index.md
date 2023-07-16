
<div class="nutshell">

Hi, I’m Lea and I wear many hats.
I design and build [tools](/projects/) that help people create on the Web.
I [design](/publications/#specifications) and [review](/blog/2022/11/tag-2/) technologies implemented in every browser.
I do [scientific research](/publications/#research) at [MIT](https://haystack.csail.mit.edu) on democratizing web development.
I [speak](/speaking/), [teach](https://designftw.mit.edu), and [write](/publications/) about things I learn and discover.
Sometimes I [blog](/blog/) about all this (and more!).

<a class="call-to-action" href="/about/">Learn more about me</a>

</div>

## [Blog](/blog/)

{% import "_posts.njk" as posts %}
{{ posts.list(collections.blog.reverse().slice(0, 31), {style: "compact", start: collections.blog.length}) }}