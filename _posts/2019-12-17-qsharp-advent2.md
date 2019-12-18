---
layout: post
title: "Party Invitations: How Q# enables inclusive teaching"
---

_This is a post contributing to [#QsAdvent](https://twitter.com/hashtag/qsadvent) 2019_

Tis' the season of holiday parties, gathering co-workers and their families to eat much delicious food, and share pictures of their pets.
Compared with most of my work environments, having a more diverse group causes a marked change in conversation tone and participation.
After a few such parties lately, I wanted to reflect on how we as a community can encourage diversity in quantum computing.
If the kind of inclusion at a holiday party can change how and who we talk to, how much different would our research progress look if we had a more diverse community?
If we don't take proactively steps to invite everyone to the quantum party, we will be stuck with the current "diversity" endemic to the system.

## What can we do to make sure everyone is invited to the party?

There are lots of different ways we can encourage inclusion in quantum computing, from having codes of conduct at events like hackathons and meetups, to encouraging open community contributions and discussion online with open source projects. 
I could probably write a number of posts on these topics, but since this is a Q# advent post, I want to talk specifically here about what I have learned about being more inclusive when teaching Q#.

So, why does documentation and learning tools matter?
Whenever I get to start a new project in a language or toolchain I don't know I go straight to the docs and whatever "Hello World!" tutorials I can find.
I know for myself, if the first 101 level tutorial I find uses only male pronouns or all kinds of terms I don't know, it is easy to get discouraged.
Given quantum computing's academic background, it is easy to slip into language that is familiar and comfortable at a physics conference but that is really alienating for someone new to the field.
With this post, I want to offer three tips I have learned to help make the Q# projects I am working on more inclusive.
I also encourage you if you have more ideas or discussion on this topic to join the [qsharp.community chat](https://gitter.im/qsharp-community/community)!

### Teach by exploration and games

One of the biggest challenges my co-author Chris Granade and I have run into when working on [our book on Q#](bit.ly/qsharp-book) is motivating some of the techniques and algorithms we are trying to teach.
What happens is the algorithms have been developed usually with applications in mind that are very technical.
By the time you have explained the physics of the motivating example, it is hard to make progress on what you actually want to teach which is the actual algorithm or quantum development technique.
Especially if we want to fine more applications for quantum computing, I think it is hard to "bake in" so much of these initial examples to how we are teaching the techniques themselves.
We can teach sorting algorithms without making everyone learn the gory details of a specific data set that it was used on first. 

Our approach to avoid this unnecessary confusion and baggage is to re-formulate the scenarios or examples as games.
We were inspired by the non-local games already a big part of quantum for talking about correlation and testing quantum mechanics.
When everything is a game, its easy to focus on writing code that would win.

For example, phase estimation is a very common quantum algorithm that is useful for transferring information about operations between global and local phases.
This is important as we can only measure local phases so we need a way to shuffle phase around.
If we look at the way [Wikipedia](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm) and [Quantum Computation and Quantum Information](https://en.wikipedia.org/wiki/Quantum_Computation_and_Quantum_Information) describes phase estimation:

> Given a unitary matrix 𝑈 and a quantum state \|𝜓⟩ such that 𝑈\|𝜓⟩ =e^{2𝜋𝑖𝛳}\|𝜓⟩, the algorithm estimates the value of 𝛳 with high probability within additive error 𝜀 , using 𝑶(1/𝜀) controlled-U operations.


If you don't already know why this might be cool, unpacking it can take a fair bit of math.
<p style="text-align: center;">
	<img src="/public/media/blog/chewie-mikeandike.jpg" alt="German shepard dog named Chewie laying on the couch on a book" style="width: 60%; display: inline;padding-top: 1em;"/>
</p>

_Even my new pup [Chewie](https://www.instagram.com/chewieborka/) was not really interested in unitaries_ 😂

You can take the same algorithms and put it in terms of a game like in Chapter 8 of my book (where yes, many of the games involve characters from Arthurian legends):

> Dagonet is bored in the castle one evening and decides to try and engage Lancelot in a game.
> Dagonet has a black box which applies a rotation operation to the input qubit by some angle. Lancelot can provide an additional number input to the black box which gets multiplied with the rotation angle Dagonet already secretly hid in the box, and then is angle the input qubit is rotated by. What is Lancelot's best strategy to guess Dagonet's hidden angle as efficiently as possible?

This second way of presenting the same scenario is much more approachable and will help reduce any intimidation presented by the mathematical notation.
It also allows the learners to have a mental model for the scenario, and use that to help drive further questions and exploration.
Q# really makes the games based approach easy as it is a fairly high level language, so it's easy to skip how things are implemented to start and focusing on _why_.
The libraries for Q# also help a lot in that they can allow users to jumpstart fairly complicated algorithms by using library operations as subroutines.

If you like this approach or want to see more, check out [_Learn Quantum Computing with Python and Q#_](bit.ly/qsharp-book), now in early preview from Manning!

### Get over the math

As we saw with the previous tip, the math used to describe quantum computing can be intimidating.
One of the most common things I hear when I start talking with someone about quantum computing is "wow that's a lot of math! I hate math!" or something to that effect. 
A great strength of quantum programming is that we don't need to _start_ with the math to teach what is going on. 
Knowing the math we know to describe the quantum systems is still helpful, and I am not advocating from cutting it out entirely.
When we start with the math, and especially without good introductions/right audiences it is easy to scare folks away.

With tools like Q# and the QDK, can jump right away to writing programs for quantum computers.
It allows people to start playing around with algorithms and libraries, and not getting stuck in the math.
Once they feel comfortable with the language and syntax they have a valuable tool that can help them when they start getting curious about the math.
If something doesn't make sense or they want to check their work, they can always just run the Q# code and dump the state of the simulator.
There someone else has done the hard work of translating all of the math into software, and the student can use my colleagues' favorite development technique of tweak-compile-tweak 😊
If visual tools resonate with the student, the [Q# visual debugger](https://www.sarahmarshall.name/blog/visualizing-quantum-state-with-qsharp.html) can be a really great tool to help see what is going on without needing to doing the math by hand.

### Help folks get to programming faster 

When learning a new language or starting a new project, one of the hardest parts can be setting up the development environment to get everything to work right.
Then invariably, some Windows Update will break everything (or me just absentmindedly updating some part of the tool chain for another project).
However, especially in a classroom setting the variety of devices and operating systems, it is extremely desirable to get up and running as quickly as possible.
Having run some workshops and tutorials, I know the hard way what its like to have a whole room full of people trying to get everything up and running for a project from scratch 😵
That's where having the [Q# Katas as Jupyter notebooks you can run in your browser](https://mybinder.org/v2/gh/Microsoft/QuantumKatas/master?filepath=index.ipynb) and the entire Quantum Development Kit useable from the browser with [Visual Studio Online](https://visualstudio.microsoft.com/services/visual-studio-online/) can really be handy.
I can just prepare a notebook and conda enviroment ahead of time and with just one click, everyone can be on the same page, ready to start developing together💖

_On Dec 22nd, keep an eye out for Chris Granade's #QSadvent post on reproducible research, which gets into more detail on containerizing and reproducible use of the QDK._


### Use language effectively

At the end of the day we all must go through and document projects and write the tutorials. we have to spend some time thinking about words and how to communicate the cool stuff we learned.
This is a huge opportunity to make sure that the words we are actually using do encourage and include as many learners as possible.
Some specific examples of this are:

- **Pronoun use:** Many technical docs will often default to masculine pronouns, make sure to either mix it up as you write/speak and use a variety of pronouns. Better yet, just use they!<!-- CG: better yet, use "they!" It's centuries-old retro goodness, and as a bonus makes you 121% less likely to be an asshole! -->
- **Proper nouns in naming:** As highlighted in the [Q# style guide](https://docs.microsoft.com/en-us/quantum/contributing/style-guide?view=qsharp-preview&tabs=guidance#proper-nouns-in-names), naming things after "important" people can be difficult if your audience is not familiar with them. Especially as the quantum community grows past its physics roots, naming something a Fredkin operation conveys far less information than if it was called `Controlled SWAP`.
- **Terms that are racist/misogynistic/harmful:** We have seen the rise of some terms in quantum computing, like "quantum supremacy" that are directly harmful to the community. For example, see the [open letter](https://www.quantumresponsibility.org/openletter) posted in [_Nature_](https://doi.org/10.1038/d41586-019-03781-0) that clarifies why we should stop using this term immediately. For more on this topic, see [this fabulous blog](https://medium.com/@emma.m.mckay/why-we-need-to-get-over-quantum-supremacy-619ddf67ae72) by Emma McKay.

# Conclusion

One of the most exciting things to me is to see how this new quantum development community grows, and how we have the power to shape it.
This is why inclusive docs, tutorials, blog posts, etc. are all so important as is how we can invite people to give quantum computing a go.

> On social media use the tags **#qsharp**, **#AzureQuantum**, and **#qsharpeningmyskills** so all quantum developers can learn together 💖

Happy Hamiltonians and may you find your ground state in 2020! 🎁⛄❄🍷🎶💻

- [Q# Community](qsharp.community)
- [MSFT Quantum Team Blog](https://cloudblogs.microsoft.com/quantum/)
- [Q# Advent Calendar](https://devblogs.microsoft.com/qsharp/q-advent-calendar-2019/)
