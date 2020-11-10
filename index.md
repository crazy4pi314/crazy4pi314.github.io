---
layout: default
title: Home
---

<div class="flex-grid" style="flex-direction: column">
  <div style="flex-direction: row; flex-wrap: wrap; width: 100%;">
    <div style="flex-direction: column; flex-basis: 100%; flex: 2;">
      <h1> Welcome! </h1>
      <p>I'm Dr. Sarah Kaiser and I love everything about quantum technology! Some of my favorite things inclued: writing about science and technology, laser cutters, and playing with my pupper,<a href="https://www.instagram.com/chewieborka/"> Chewie</a>.</p>
    </div>
    <div style="flex-direction: column; flex-basis: 100%; flex: 1; margin: 0.4em;">
      <img src="/public/profile-photo.jpg" alt="Sarah Kaiser" style="width: 100%; display: inline;"/>
    </div>
  </div>

  <div style="flex-direction: row; width: 100%">
    <h2>Check out my books!</h2>
  </div>

  <div style="flex-direction: row; flex-wrap: wrap; width: 100%;">
    <div style="flex-direction: column; flex-basis: 100%; flex: 1; margin: 0.4em;">
      <img src="/public/media/figures/LQCPQ.png" alt="Cover of Learn Quantum Computing with Python and Q#" style="width: 100%; display: inline;"/>
    </div>
    <div style="flex-direction: column; flex-basis: 100%; flex: 2;">
      <p>
        <a href="https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp" target="_top">Learn Quantum Computing with Python and Q#</a> with <a href="https://cgranade.com/">Chris Granade</a>
      </p>
    </div>
    <div style="flex-direction: column; flex-basis: 100%; flex: 1; margin: 0.4em;">
      <img src="/public/media/figures/kaiser-book-collection.jpg" alt="Cover of Learn Quantum Computing with Python and Q#" style="width: 100%; display: inline;"/>
    </div>
    <div style="flex-direction: column; flex-basis: 100%; flex: 2;">
      <p>
        <a href="https://www.amazon.com/Sarah-Kaiser/e/B07H4VDXW5/" target="_top">Baby University Collection</a> with <a href="https://csferrie.com/">Chris Ferrie</a>
      </p>
    </div>
  </div>
</div>
  <div style="flex-direction: row; width: 100%">
    <h2>Watch me develop quantum software on Twitch!</h2>
  </div>

<!-- <iframe src="https://player.twitch.tv/?collection=zNmwPZWAERanCw&video=videoId&parent=www.sckaiser.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> -->

<iframe
      src="https://player.twitch.tv/?channel=crazy4pi314&parent=www.sckaiser.com&autoplay=false"
      frameborder="0"
      scrolling="no"
      allowfullscreen="true"
      height="378"
      width="620">
    </iframe>

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
  <img src="{{ post.image | prepend: site.baseurl }}" alt="{{ post.title }}" title="{{ post.title }}">
  {{ post.excerpt}}
</article>
{% endfor %}
</div>

-----

<h2>What am I up to right now?</h2>
<a class="twitter-timeline" data-theme="light" data-tweet-limit="5" href="https://twitter.com/crazy4pi314?ref_src=twsrc%5Etfw">Tweets by crazy4pi314</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<style type="text/css">
  .flex-grid div {
    display: flex;
  }

  @media(max-width: 501px) {
    .flex-grid div {
      display: block;
    }
  }
</style>

<hr>
<h2>Links to me other places:</h2>
<p style="text-align: center;">
<a href="https://twitter.com/crazy4pi314" target="_top">Twitter</a> • 
<a href="https://www.instagram.com/crazy4pi314" target="_top">Instagram</a> •
<a href="https://www.linkedin.com/in/sckaiser1" target="_top">Linkedin</a> • 
<a href="https://www.twitch.tv/crazy4pi314" target="_top">Twitch</a> • 
<a href="https://github.com/crazy4pi314" target="_top">GitHub</a> • 
<a href="http://arxiv.org/a/kaiser_s_1" target="_top">arXiv</a> • 
<a href="https://www.researchgate.net/profile/Sarah_Kaiser" target="_top">ResearchGate</a> • 
<a href="https://scholar.google.ca/citations?user=wUnQwUMAAAAJ&hl=en" target="_top">Google Scholar</a> • 
<a href="https://keybase.io/skaiser" target="_top">Keybase</a><br>
<br>
</p>