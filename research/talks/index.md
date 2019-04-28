---
layout: page
title: Selected Talks
---

Here is some of the talks I have given, that I made as webpages with [reveal.js](http://lab.hakim.se/reveal-js/#/). 

## 2019 ##

- ### [What is Quantum Machine Learning, and Is It A Thing?](./ml4all_2019): ML4ALL Conference 

In the rush to add the word _quantum_ to everything from batteries to banking, Quantum machine learning has entered the fray. A perfect combination of buzzwords that will get all of the funding....right? In this talk I want to look at: quantum computers are and how you program one. With this context, we can look at what machine learning tasks are being explored for possible speedups with quantum computing. Talk details [here](http://ml4all.org/schedule.html#abstract-dr-sarah-kaiser).

- ### Learning Q# with Python: building the quantum programming community: Microsoft BUILD 2019

Quantum computing is an exciting and growing field that needs to train a new generation of programmers to leverage quantum technologies. There are lots of barriers to engaging new learners in quantum computing, which often stem from the language and traditional methods by which it is usually taught. Q# is the new quantum programming language developed by Microsoft, and offers a unique new approach to teaching quantum programming concepts with a domain-specific language. In this session, I will demo some core quantum computing concepts using Q# and Python. Leveraging Python as a language and a community helps newcomers to quantum programing get up and going faster. Talk details [here](https://mybuild.techcommunity.microsoft.com/sessions/77163?source=sessions#top-anchor).

## 2018 ##

- ### [Quantum Machine Learning in context: What is a quantum algorithm anyway?](./qml_portland_2018): Portland Data Science Group

In the rush to add the word _quantum_ to everything from batteries to banking, Quantum machine learning has entered the fray. A perfect combination of buzzwords that will get all of the funding....right? In this talk I want to look at quantum algorithms and what actually constitutes programming a quantum computer. With this context, we can look at what machine learning tasks are being explored for possible speedups with quantum computing.

Talk details [here](https://www.meetup.com/Portland-Data-Science-Group/events/255093322)!

## 2017 ##

- ### [Super Cool Science](./LFQIS-2017): LFQIS 2017

- ### [Spontaneous Superradiance from Single Diamond Nanocrystals](./NDNC_2017): NDNC 2017 ###

    [PDF abstract](../../public/download/kaiser-NDNC17-abstract.pdf)

- ### [Extending the reach of QKD](./UTS_seminar_2017): UTS Seminar ###

    Cryptography is an important social and technical aspect of our modern world. The physical nature by which we can obscure or encrypt information has changed drastically with new technologies that allow for the manipulation of quantum information. We now use Quantum Key Distribution (QKD) quite readily to exchange random bit strings called keys between parties. I will discuss some of the possible paths forward to making this a practical technology, including looking at hardware vulnerabilities as well as how to extend the physical reach of the systems. 

- ### [Photon phreaking: What quantum can (actually) do for security](./crypto_club): Gemalto Crypto Club ###

    What properties of quantum systems can be useful for cryptography? Quantum systems have the potential to be new cryptographic tools and force us to re-examine our current assumptions of computational complexity. We will look at some interesting examples of the new tech and protocols like quantum key distribution and "quantum hacking", quantum random number generators, quantum computing and algorithms. What consequences do these technologies have for our current cryptographic infrastructure?

## 2016 ##

- ### [Extending the reach of QKD: Satellite prototype for quantum communication](./photonics_connections_2016): Photonic Connections 2016 ### 


- ### [Practical quantum cryptography devices: how to make them and how to break them](./macquarie_seminar_2016): Macquarie QuSciTech seminar ### 

    Long-distance quantum communication systems are of interest for commercial and fundamental scientific projects. Commercially available Quantum Key Distribution (QKD) devices that claim physical security of generated keys rely on telecom fiber networks to link communicating parties.  This talk will address two main aspects to making QKD devices practical: satellites can be used to extend the range of the QKD devices past the current limit of ~200km, and all current implementations of QKD are insecure due to hardware vulnerabilities. I will also identify remaining challenges for practical long distance quantum communication.

- ### [Quantum key distribution devices: How to make them and how to break them (Thesis defense)](./thesis_defense) : PhD thesis Defense ### 

    As more aspects of modern society depend on digital communication, we increasingly rely on infrastructure that ensures the privacy and security of this communication. Classically, this has been provided by cryptographic protocols such as public-key encryption, in which secrets called keys are exchanged between different parties to enable secure communication. The rapid development of quantum algorithms which violate the assumptions of these protocols, however, poses a security challenge to modern cryptography. Quantum resources can also be used to strengthen cryptographic security, particularly the security of key exchange protocols. This approach, QKD, can be implemented by encoding in quantum systems such as single photons sent through free-space or a fiber. Fiber based QKD devices are already commercially available, but are fundamentally limited to distributing keys over a few hundred kilometers. To address this distance limitation, research QKD systems are being developed to exchange keys through free-space to satellites. This work considers practical challenges to building and testing both types of QKD devices. Firstly, we consider modeling and mission analysis for airborne demonstrations of QKD to stratospheric balloons and aircraft to simulate a satellite. Based on the mission parameters available for both platforms, we found aircraft platforms were more promising for testing prototype QKD satellite systems. We developed a mission planning tool to help design the flight geometries for testing the device. Next, we developed three new components for a QKD satellite prototype. The requirements for electro-optical devices in orbit are very different from lab environments, mandating new approaches to designing QKD devices. We developed a quad single photon detector package to meet the requirements for free-space links to low earth orbit. Moreover, we designed and built optical systems for analyzing the polarization of photons and an adaptive optics unit to increase the efficiency of collecting the encoded photons. All three devices were tested in conditions that simulated the time and loss of a satellite pass. Finally, we demonstrated a laser damage attack on a live commercial QKD system. Our attack injected additional optical power into the sender device to modify security-critical components. Specifically, our attack damaged the PIN diodes which monitor the encoded photon number, reducing their sensitivity or completely blinding them. Our damage could compromise the entire key, and was performed during system operation while raising no alarms. In summary, this work shows the trade-offs of testing QKD payloads on different airborne platforms, develops components for a satellite QKD payload, and demonstrates a security vulnerability in a commercial QKD system that can fully compromise the key. These results help address practical challenges to building QKD devices, improving the security of modern cryptography.