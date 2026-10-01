---
title: Quantum key distribution devices
subtitle: How to make them and how to break them
event: PhD Thesis Defense
eventUrl: 
eventAsset: 
location: University of Waterloo
video: 
slides:
  reveal: thesis_defense
code:
date: 2016-08-10T09:00:00-05:00
abstract: |
  As more aspects of modern society depend on digital communication, we increasingly rely on infrastructure that ensures the privacy and security of this communication.
  Classically, this has been provided by cryptographic protocols such as public-key encryption, in which secrets called keys are exchanged between different parties to enable secure communication.
  The rapid development of quantum algorithms which violate the assumptions of these protocols, however, poses a security challenge to modern cryptography. 
  Quantum resources can also be used to strengthen cryptographic security, particularly the security of key exchange protocols.
  This approach, QKD, can be implemented by encoding in quantum systems such as single photons sent through free-space or a fiber.
  Fiber based QKD devices are already commercially available, but are fundamentally limited to distributing keys over a few hundred kilometers.
  To address this distance limitation, research QKD systems are being developed to exchange keys through free-space to satellites.
  This work considers practical challenges to building and testing both types of QKD devices.
  Firstly, we consider modeling and mission analysis for airborne demonstrations of QKD to stratospheric balloons and aircraft to simulate a satellite.
  Based on the mission parameters available for both platforms, we found aircraft platforms were more promising for testing prototype QKD satellite systems.
  We developed a mission planning tool to help design the flight geometries for testing the device.
  Next, we developed three new components for a QKD satellite prototype.
  The requirements for electro-optical devices in orbit are very different from lab environments, mandating new approaches to designing QKD devices.
  We developed a quad single photon detector package to meet the requirements for free-space links to low earth orbit.
  Moreover, we designed and built optical systems for analyzing the polarization of photons and an adaptive optics unit to increase the efficiency of collecting the encoded photons.
  All three devices were tested in conditions that simulated the time and loss of a satellite pass.
  Finally, we demonstrated a laser damage attack on a live commercial QKD system.
  Our attack injected additional optical power into the sender device to modify security-critical components.
  Specifically, our attack damaged the PIN diodes which monitor the encoded photon number, reducing their sensitivity or completely blinding them.
  Our damage could compromise the entire key, and was performed during system operation while raising no alarms.
  In summary, this work shows the trade-offs of testing QKD payloads on different airborne platforms, develops components for a satellite QKD payload, and demonstrates a security vulnerability in a commercial QKD system that can fully compromise the key.
  These results help address practical challenges to building QKD devices, improving the security of modern cryptography.
tags:
  - research
  - phd
  - qkd
  - satellite
---
