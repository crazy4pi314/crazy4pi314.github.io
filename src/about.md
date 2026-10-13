---
layout: layouts/page.njk
title: About
description: Sarah Kaiser — scientist, maker, community builder.
hideDescription: true
hideDivider: true
eyebrow: about.md
section: "#todo: keep updated :P"
eleventyNavigation:
  key: About
---
I am an experimental physicist turned software developer with over 15 years experience in developing and managing cutting-edge tech projects. While not from Seattle originally, I have found my home here and enjoy [writing books](/books/) about cool technologies (on a split ergo keyboard), cutting things with lasers, and playing with my pup Chewie.

<div class="media-grid">
  <figure class="media-figure about-photo">
    <div class="hero-photo">
    <img class="content-image" src="/static/img/chewie-mikeandike.jpg" alt="Sarah's German Shepherd named Chewie curled up on the couch with a quantum textbook" width="1400" height="1050">
    </div>
    <figcaption>Chewie, chief napping officer.</figcaption>
  </figure>
</div>

## Experience

I got my PhD in Physics (Quantum Computing) by starting plasma fires with lasers to hack quantum crypto devices and trying to send and detect single photons in space ([read the thesis](http://hdl.handle.net/10012/10725)). I moved to working in both academic and industry research settings, focusing on optical systems, machine learning, product design, open source software, development, and quantum technologies.

As a developer, Python is my go-to language for most things, but I also dabble in other tools like Rust and Nix. In 2021 I was awarded a Python Software Foundation Fellowship, and I currently work as a developer advocate at [GitHub](https://github.com/crazy4pi314) for the Python OSS community.

<figure class="media-figure media-figure--single about-photo">
  <div class="hero-photo">
  <img class="content-image" src="/static/img/lab-uw.jpg" alt="Sarah in a dark lab with optical fibers glowing red and green wrapped around her" width="1400" height="1050">
  </div>
  <figcaption>Optical fibers make excellent lab jewelry.</figcaption>
</figure>

**Cool stuff I have worked on:**

<ul>
  <li>Low noise optical systems on satellites</li>
  <li>Virtual reality hardware</li>
  <li>Nanodiamonds for quantum sensing at cryogenic temperatures (automated with Python and Jupyter Notebooks 💖)</li>
  <li>Software tools and languages for quantum computers</li>
</ul>

## Passions

I am a vocal activist for diversity and inclusion in STEM fields and often give [presentations]({% if site.features.eventsPage %}/events/{% else %}/blog/{% endif %}) on my experiences and perspective as a bisexual enby in tech. Live streaming quantum software development on [Twitch](https://www.twitch.tv/crazy4pi314) has been another great way I connect with folks to make quantum tech more accessible.



<div class="badge-wall about-badges" role="group" aria-label="Feeds and profiles">
{% for badge in site.badges %}
{% if not badge.feature or site.features[badge.feature] %}{% button88 badge.label, badge.url, badge.accent %}{% endif %}
{% endfor %}
</div>
