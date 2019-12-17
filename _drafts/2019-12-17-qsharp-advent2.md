---
layout: post
title: "Party Invitations: Designing diversity into the docs"
---

_This is a post contributing to [#QsAdvent](https://twitter.com/hashtag/qsadvent) 2019_

Tis' the season of holiday parties, where drinks are made, and all the sugar consumed.
The holiday parties generally encourage including partners and families, which does push gender ratios closer to 50:50.
Compared most of my work environments, it causes a marked change in conversation tone and participation.
After a few such parties lately, I wanted to reflect on how we as a community can encourage diversity in quantum computing. 

Because me and my friends are nerdy, party chit chat this year was a bit technical.
Once we get on to quantum computing, one of the topics that comes up most is particular _applications_ that are being explored. 
How we will find the "killer app" for this new model for computing, and when will we have the hardware to run it?
My response is always by making sure that we include _everyone_ in building this new technology and community.

## What can we do to make sure everyone is invited to the party?

There are many things that we can do as a community to make sure that everyone is included, from having codes of conduct at events like hackathons and meetups; to encouraging open community contributions and discussion online with open source. 
What I want to focus on here, is what we can do as a community to make sure the _documentation_ and _learning tools_ we provide don't inadvertently limit the growth of the community. 
Given I work with Q# a lot [in my writing](bit.ly/qsharp-book), I want to talk specifically here why I like using Q# to teach quantum computing in inclusive ways.
I have 3 main tips/observations that I have learned along the way, but if you have any more 

### Simple grammar fixes  (good for everything)

Language matters, especially in teaching tools for technical topics like quantum computing.
I'll try to condense some lessons I have learned about the language we use to communicate quantum computing here.

- **Be aware of pronoun use:** Many technical docs will often default to masculine pronouns, make sure to either mix it up as you write/speak and use a variety of pronouns.
- **Don't use proper nouns in naming:** As highlighted in the [Q# style guide](https://docs.microsoft.com/en-us/quantum/contributing/style-guide?view=qsharp-preview&tabs=guidance#proper-nouns-in-names), naming things after "important" people can be difficult if your audience is not familiar with them. Especially as the quantum community grows past its physics roots, naming something a Fredikin operation conveys far less information than if it was called `CSWAP`.
- **Don't use terms that are racist/misogynistic/harmful:** We have seen the rise of some terms in quantum computing, like "quantum supremacy" that are directly harmful to the community. For example, see the [open letter](https://www.quantumresponsibility.org/openletter) posted in [Nature](https://doi.org/10.1038/d41586-019-03781-0), that clarifies why we should stop using this term immediately. For more on this topic see this [fabulous blog](https://medium.com/@emma.m.mckay/why-we-need-to-get-over-quantum-supremacy-619ddf67ae72) by Emma McKay.

### Math is intimidating

One of the most common things I hear when I start talking with someone about quantum computing is "wow that's a lot of math! I hate math!" Or something to that effect. 
What I really think is powerful is that we don't need to start with the math to teach quantum computing. 
We can (with tools like Q# and the QDK) can jump right to writing programs for quantum computers.
If a developer or student needs to learn a new programming language, sometimes they will read the docs or a book first.
If they are like myself they will just try to get the full tool chain working and try out a "Hello World" sample or tutorial instead :P
This approach has been referred to by my colleagues as, "the compile, tweak, compile" approach.

There is a lot of power in this, though, as it allows people to start writing programs and play around with algorithms and libraries.
Once they feel comfortable with the language and syntax and start getting curious about the results they are seeing, it is much easier to start showing what is going on in the simulator.
The most common math used in quantum computing is to describe what the simulator should do, something that if you were running on real hardware, you wouldn't have to in some sense know.


//TODO: finish

### Teach by exploration and games
    - Physics isn't the interesting part, play games -> phase estimation

### Hard to setup tool chains/development environments 

When learning a new language or starting a new project, one of the hardest parts can be setting up the development environment to get everything to work right.
Then invariably, some Windows Update will break everything (or me just absentmindedly updating some part of the tool chain for another project).
I have personally been learning a lot about docker lately, and I love getting each of my projects setup in its own container.

However, especially in a classroom setting the variety of devices and operating systems, it is extremely desirable to get up and running as quickly as possible.
That's where having the [Q# Katas as Jupyter notebooks you can run in your browser](https://mybinder.org/v2/gh/Microsoft/QuantumKatas/master?filepath=index.ipynb) and the entire Quantum Development Kit useable from the browser with [Visual Studio Online](https://visualstudio.microsoft.com/services/visual-studio-online/) can really be handy.

_On Dec 22nd, keep an eye out for Chris Granade's post on reproducible research, which gets into more detail on containerizing and reproducible use of the QDK_


# Conclusion

Just like the holiday party spreads of the season, we all benefit from diversity.
No one likes a table full of fruitcake, and we shouldn't be satisfied with only one "type" of quantum 
It is really exciting to constantly be learning and finding new ways of teaching quantum computing with Q#.




> On social media use the tags **#qsharp**, **#AzureQuantum**, and **#qsharpeningmyskills** so all quantum developers can learn together 💖

Happy Hamiltonians and may you find your ground state in 2020! 🎁⛄❄🍷🎶💻

- [Q# Community](qsharp.community)
- [MSFT Quantum Team Blog](https://cloudblogs.microsoft.com/quantum/)
- [Q# Advent Calendar](https://devblogs.microsoft.com/qsharp/q-advent-calendar-2019/)
