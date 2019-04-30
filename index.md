---
layout: default
title: Home
---
 
# Welcome! #

I am Sarah Kaiser and currently I am a Research Engineer at [Pensar Development](https://pensardevelopment.com/) in Settle, WA. Most recently I was a Postdoctoral Fellow at [Macquarie University](https://www.mq.edu.au/). I got my PhD from the [Institute for Quantum Computing](https://uwaterloo.ca/institute-for-quantum-computing/) at the [University of Waterloo](https://uwaterloo.ca/) in Waterloo, Ontario. I am physics experimentalist specialized in building and breaking opto-electronic systems. Some of my favorite things: Writing about science and technology, laser cutters, and how fun it is to break things! (to learn how they work of course 😉)

<p style="text-align: center;">
	<img src="/public/profile-photo.jpg" alt="Sarah Kaiser" style="width: 60%; display: inline;padding-top: 1em;"/>
</p>

**Links to me other places:**
<p style="text-align: center;">
<!-- [arXiv](http://arxiv.org/a/kaiser_s_1) •
[ResearchGate](https://www.researchgate.net/profile/Sarah_Kaiser) •
[Google Scholar](https://scholar.google.ca/citations?user=wUnQwUMAAAAJ&hl=en) •
[GitHub](https://github.com/crazy4pi314) •
[Linkedin](https://www.linkedin.com/in/sckaiser1) -->
<a href="http://arxiv.org/a/kaiser_s_1" target="_top">arXiv</a> • 
<a href="https://www.researchgate.net/profile/Sarah_Kaiser" target="_top">ResearchGate</a> • 
<a href="https://scholar.google.ca/citations?user=wUnQwUMAAAAJ&hl=en" target="_top">Google Scholar</a> • 
<a href="https://github.com/crazy4pi314" target="_top">GitHub</a> • 
<a href="https://keybase.io/skaiser" target="_top">Keybase</a> • 
<a href="https://www.linkedin.com/in/sckaiser1" target="_top">Linkedin</a><br>
<br>
</p>

**Check out my books!**

<p style="text-align: center;"><a href="https://www.amazon.com/Sarah-Kaiser/e/B07H4VDXW5/" target="_top">Baby University Books</a> with <a href="https://csferrie.com/">Chris Ferrie</a><br> 
<a href="https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp" target="_top">Learn Quantum Computing with Python and Q#</a> with <a href="https://cgranade.com/">Chris Granade</a>
	<!-- <img src="/public/profile-photo.jpg" alt="Sarah Kaiser" style="width: 60%; display: inline;padding-top: 1em;"/> -->
</p>

---

## Latest Blog: ##

<div class="posts">
{% for post in site.posts limit:1 %}
<article>
  <h2>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>
  </h2>
  <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
  {{ post.content }}
</article>
{% endfor %}
</div>
