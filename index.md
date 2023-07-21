---
title: Home
---
<div class="nutshell">

<img src="/about/images/smiling-medium.jpg" alt="Photo of me smiling">

Hi, I’m Lea and I wear many hats.
I create [tools](/projects/) that make web development easier.
I [design](/publications/#specifications) new web technologies, and [design review](https://github.com/w3ctag/design-reviews/) dozens more as a [W3C TAG member](https://en.wikipedia.org/wiki/Technical_Architecture_Group);
your browser implements several of these.
I've done [HCI research](/publications/#research) at [MIT](https://haystack.csail.mit.edu) on democratizing web development, earning me a PhD.
I [speak](/speaking/), [teach](https://designftw.mit.edu), and [write](/publications/),
including a [bestselling book](http://www.amazon.com/CSS-Secrets-Lea-Verou/dp/1449372635?tag=leaverou-20) with [O’Reilly](https://oreilly.com),
dubbed ["Best CSS book"](https://www.chicagotribune.com/consumer-reviews/sns-bestreviews-electronics-the-best-css-book-20200701-kda2pyikobda5o3c4ivi4wzfui-story.html).
Sometimes I [blog](/blog/) about all this -- and more!

<p><a class="call-to-action" href="/about/">Learn more about me</a></p>
</div>

## [Blog](/blog/)

{% import "_posts.njk" as posts %}
{{ posts.list(collections.blog.reverse().slice(0, 31), {style: "compact", start: collections.blog.length}) }}