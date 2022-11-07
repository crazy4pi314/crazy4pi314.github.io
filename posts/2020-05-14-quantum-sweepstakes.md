---
title: Quantum Sweepstakes Machine
metaDescription: Quantum Sweepstakes Machine
slug: quantum-sweepstakes
date: 2020-05-14T00:00:00.000Z
author: Sarah Kaiser
summary: Show how to leverage existing Q# libraries + runtime and extend them to add new features!
tags:
  - quantum
  - programming
  - qsharp
---

*TL;DR I wrote a quantum random number generator in Q# to play games. Run the code in your browser here:* [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/crazy4pi314/90c74fd23f084de8e78b150ba1987c1c/master?filepath=START-HERE.ipynb) 

<p style="text-align: center;">
<img src="/static/img/2020-05-14-quantum-sweepstakes.png" alt="Screencap of the Jupyter Notebook in the Gist" style="width: 60%; display: inline;padding-top: 1em;"/>
</p>

I have really been enjoying working on some of my open source projects on [Twitch](twitch.tv/crazy4pi314) lately, and to try and drive more viewership I thought I would do a giveaway/sweepstakes on a stream. It came time to select the winner and I realized I simply could not do this with a boring old random number generator online. So I decided to write up a quick snippet in Q#, Microsoft's new quantum programming language, on the stream and wanted to post a quick write up with the code here.

> You can find the code for this post in this [Gist](https://gist.github.com/crazy4pi314/90c74fd23f084de8e78b150ba1987c1c), and run it all in your browser on [myBinder](https://mybinder.org/v2/gh/crazy4pi314/90c74fd23f084de8e78b150ba1987c1c/master?filepath=START-HERE.ipynb).

There are two main files included in this gist, the first is a Jupyter Notebook that allows you to run the snippet and use it to select random integers yourself!

<script src="https://gist.github.com/crazy4pi314/90c74fd23f084de8e78b150ba1987c1c.js?file=START-HERE.ipynb"></script>

It currently is setup to select a random integer from 0 to 6 inclusive (7 total players), which index the list of viewers I had at the time. If you want to change the number of players you can just edit the argument in the first cell and re-run it by hitting shift and enter at the same time.

The Q# code here can be found in the `operations.qs` file:

<script src="https://gist.github.com/crazy4pi314/90c74fd23f084de8e78b150ba1987c1c.js?file=operations.qs"></script>

This file defines a namespace `Sweepstakes` and one operation, `SelectWinner` that takes an integer argument that defines the number of players.
The main steps to this pretty short operation are as follows:

1. Figure out how many qubits you need to represent the number of players you have.
2. [Allocate](https://docs.microsoft.com/en-us/quantum/techniques/working-with-qubits#allocating-qubits) your qubits with `using`, and put them all in superposition by applying the [`H` operation](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.intrinsic.h) (short for Hadamard) to each qubit in the register.
3. Measure the register and interpret the bit string of measurement results as a binary value ([`MeasureInteger`](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.arithmetic.measureinteger)). I did have to also specify whether the register was to be interpreted as a little endian register so it knew how to parse it.
4. Lastly, if that measured integer was outside of the range of players (this will happen if the number of players is not a power of 2) then just repeat steps 2 and 3 until you get a valid player index.

And that's pretty much it!
A random integer generator written in the quantum programming language Q# that you can use to make all of the hard decisions in your life 😋
If you want to learn more about developing for quantum computers or how they work, you can check out these links:

- [Q# docs](docs.microsoft.com/quantum)
- [Learn Quantum Computing with Python and Q#](bit.ly/qsharp-book)
- [Quantum Develop with Me on Twitch](twitch.tv/crazy4pi314)