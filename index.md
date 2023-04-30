
<div class="nutshell">

Hi, I’m Lea and I wear many hats.

</div>

## [Blog](/blog/)

{% for post in collections.blog.reverse().slice(0, 20) %}- [{{ post.data.title }}]({{ post.url | url }})
{% endfor %}