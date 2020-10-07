---
layout: page
title: Blog
---
## Latest Post: ##

<div class="posts">
{% for post in site.posts limit:1 %}
<article>
  <h2>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>
  </h2>
  <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
  <img src="{{ post.image | prepend: site.baseurl }}" alt="{{ post.title }}" title="{{ post.title }}">
  {{ post.excerpt}}
</article>
{% endfor %}
</div>

## Post Archive: ##
{% for post in site.posts %}{{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})  
{% endfor %}