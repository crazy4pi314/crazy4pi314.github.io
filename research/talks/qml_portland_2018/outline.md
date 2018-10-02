# Quantum machine learning in context

<!-- In the rush to add the word _quantum_ to everything from batteries to banking, Quantum machine learning has entered the fray. A perfect combination of buzzwords that will get all of the funding....right? In this talk I want to look at quantum algorithms and what actually constitutes programming a quantum computer. With this context, we can look at what machine learning tasks are being explored for possible speedups with quantum computing. -->

- Part 1: Quantum Expectation | What can we reasonably expect from quantum resources?
    - Ask them what sorts of things they know about QC?
    - What are some common claims in media?
    - What can we actually expect?
- Part 2: Key concepts in Quantum computing
        - qubit
        - superposition
        - entanglement
- Part 2: Quantum Programing | What does a quantum algorithim look like?
    - How do we represent algorithims now?
    - Many options, Q# allows us to program the way we think at an algorithimic level. 
    - 
    
- Part 3: Where can we apply _quantum_ to ML?
    - deep learning
    - reinforcement learning
    - 
    
    
    
    
    
    
    
    • Part 1: quantum resources, what are they?
        ○ Qubit, what it is <Whiteboard>
        ○ Superposition <Whiteboard>
        ○ Entanglement <Whiteboard>
        
    • Part 2: Computing?
        ○ How does this make a quantum computer
        ○ What can quantum computers do
            § Deutch Jorza
            § Grovers
            § Shor
            § Others
        ○ How are they beating classical?
            § Something of an open question
            § Better at noisy functions
            § Improvement is heavily state dependent
            § Not strictly better at deterministic functions
        ○ Common Misconceptions
            § Superposition does not mean in two states at once
            § Quantum teleportation teleports information, not anything physical
            § All quantum systems are non-deterministic, results are probabilistic
            
            § http://www.smbc-comics.com/comic/the-talk-3
            § DWAVE is not a quantum computer
                □ It is not proven to be quantum, this is still debated
                □ Even if it is quantum it is analogue
                □ It is not a computer, it is an annealer
            § Quantum crypto, just like classical crypto is not infallible. Just because the protocols work doesn’t mean the implementation does
            § No such thing as quantum safe, just because it hasn’t been broken with any of the grand total of three algorithms doesn’t make it secure
            § There may exist algorithms that quantum computers are not good at solving, this does not mean that classical computers will also be bad at solving them
    
            
    • Part 3: QKD
        ○ How can quantum resources make things secure?
        ○ QKD protocols?
            § SPACE!!!!!
        ○ Why is this not enough?
            § SIDECHANNELS.
            § Poor implementations