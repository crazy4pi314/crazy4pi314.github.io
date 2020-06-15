---
layout: post
title: "An array of facts on arrays in Q#"
image: public/media/blog/2020-03-14-cover.png
---

_Post co-authored with [Chris Granade](https://www.cgranade.com/), my co-author on [Learn Quantum Computing with Python and Q#](https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp?a_aid=learn-qc-granade&a_bid=ee23f338)!_

> All of the Q#, C# and Python examples in this post can be run online [on Binder](https://mybinder.org/v2/gist/cgranade/09dabfe1cc2e650cd88d2cfc98185791/master). It may take a while to build the docker container so read ahead, and you can jump back when it's done. 😊

Normally when you read a post or an article about a quantum programming language like Q#, you'll see stuff about:

- what qubits are,
- what a quantum computer even is, or
- how superposition and entanglement can be used together to solve hard problems.

That's all really important to help understand why quantum computing is so cool, and how you can get started with it, but there is something that's easily lost in all of that: **quantum programs are just special kinds of classical programs**.

What do we mean by that?
At their core, quantum programs are classical programs that send instructions to quantum devices.
That means that _a lot of what you already know about classical programming still applies_.
In this post, we'll look at how Q# represents one incredibly common _classical_ data structure in what may seem to be a slightly unusual way, and how that helps make Q# a great classical language for controlling quantum devices.

## Arrays in Q# ##

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/QfGYYVrbay6kssMrYn" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/quintab-quinta-brunson-b-QfGYYVrbay6kssMrYn">via GIPHY</a></p>

Whatever they might be called in a particular language, arrays are an incredibly common and useful data structure for developers.
There can be differences in how they behave from language to language, so it might be helpful to take a look at how they work in Q#.

Consider the following snippet where you are creating two arrays (`a` and `b`) in Q#.

```Q#
mutable a = [2, 4, 6];
let b = a;

// Change the first element of `a` to 1.
set a w/= 0 <- 1;

Message($"{b}");
```

What will the value of `b` be after running all the code above?
_Reminder you can run all the code in this post [on Binder](https://mybinder.org/v2/gist/cgranade/09dabfe1cc2e650cd88d2cfc98185791/master)._

<div style='position:relative; padding-bottom:calc(54.40% + 44px)'><iframe src='https://gfycat.com/ifr/PrestigiousAggravatingEastsiberianlaika' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div><p> <a href="https://gfycat.com/prestigiousaggravatingeastsiberianlaika">via Gfycat</a></p>

The answer here comes down to the difference between whether we think of a variable as storing a _value_, or as being a _reference_ to something.
In Q#, everything is a value, so when we define a new variable with `let b = a`, we tell the Q# compiler that we want the _value_ of `b` to be equal to whatever the value of `a` is.

Therefore, the snippet above will print out the array `[2, 4, 6]`, because after we defined `b` as having the value that `a` had at that moment (`[2, 4, 6]`), not a reference to the variable `a`.
Put differently, `b` does not know anything about `a`, let alone any later changes to `a`.

Thinking of arrays as values also helps explain what `w/=` is all about in the code above.
In Q#, `w/` is a ternary operator (that is, one with three arguments) that makes a new array given: an old array, an index you want to replace, and a new element to put at that index.
For example:

```Q#
let a = [2, 4, 6] w/ 0 <- 1;
Message($"{a}"); // Prints [1, 4, 6].
```

Since `w/` is an operator, you can use it like `+`, `*`, or any other operator to make Q# values:

```Q#
let a = ([2, 4, 6] w/ 0 <- 1 w/ 2 <- 10) + [20];
Message($"{a}"); // Prints [1, 4, 10, 20].
```

When updating the value of a mutable variable, Q# provides helpful shorthand for using an operator in-place as an assignment operator:

```Q#
mutable a = 10;
set a += 1;
Message($"{a}"); // Prints 11.
```

The same exact shorthand works for `w/`, so you can use `w/=` as a shorthand:

```Q#
mutable a = [2, 4, 6];
// Both of the following lines are equivalent:
set a = a w/ 0 <- 1;
set a w/= 0 <- 1;
```

What makes all of this work is that in Q#, everything is a value.
The array `[2, 4, 6]` is a value in precisely the same way as `2` is a value, or that `true`, `"foo"`, and `3.14` are values.
<!-- A good thing to remember in Q# is that all variables are _value types_.
That means that you cannot use references to values, everything itself is a value.  -->

## How do Q# arrays compare to similar concepts in other languages?

In Python, there isn't exactly an array type, so let's look at some related types you might use in a similar way.
Lists, tuples, and strings in Python are ways of organizing collections of elements, so let's compare how they work to Q# arrays.

Tuples and strings are _immutable_, meaning that they cannot be changed after they are created.
What happens in the following snippet?

```python
a = "Hello world!"
b = a
a = a[:5] + " Cruel" + a[5:]
print(b)
```

This will print `Hello world!`, because `b` is immutable once created.
The third line where we construct a new value for `a` works because we are not trying to change `a`'s previous value, but give an entirely new one.

C# takes a very similar approach, treating strings as immutable.
Try running the following example in a [C# Notebook]() and see what you get!

```C#
var s = "abc";
var t = s;
s = s.Remove(1, 1).Insert(1, "B");
(s, t)
```

This immutability makes it really easy to reason about side-effects, since nothing else in your Python program can possibly mess with what `a` is.
Where immutability in Python gets inconvenient, though, is if you want to replace just one element of a tuple or string:

```python
>>> a = "Hello, world!"
>>> a[-1] = "?"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
```

To help with this, Python also provides _lists_, which are really similar to tuples, but are mutable; that is, the contents of lists can be changed after they are created.

```python
>>> a = [2, 4, 6]
>>> a[-1] = 10
>>> a
[2, 4, 10]
```

One way to think about Q# arrays, then, is as being similar to Python tuples, but with a cool operator (`w/`) that lets you use them in the same ways as lists _even without needing mutable collections_.
That lets you get all the benefits and predictability of immutable collections like Python strings and tuples, and like C# strings, but with the flexibility that you would normally expect from mutable collections like Python lists and and C# arrays.

You can use Q# arrays to implement a wide range of classical computing tasks from within your quantum programs, even including things like [the quicksort algorithm](https://en.wikipedia.org/wiki/Quicksort#Algorithm)!

```Q#
function Sorted<'T>(comparisonFunction : (('T, 'T) -> Bool), inputArray: 'T[]) : 'T[] {
    if (Length(inputArray) <= 1) {
        return inputArray;
    }
    let pivot = Head(inputArray);
    let left = Filtered(comparisonFunction(_, pivot), Rest(inputArray));
    let right = Filtered(Compose(Not, comparisonFunction(_, pivot)), Rest(inputArray));

    return Sorted(comparisonFunction, left) + [pivot] + Sorted(comparisonFunction, right);
}
```

Because Q# arrays are values, it's really easy to predict how they'll behave in your quantum programs, even as you do things like use the [`Adjoint` functor](https://docs.microsoft.com/quantum/language/type-model#adjoint) to run parts of your programs backwards.
Arrays are a great example of how the classical programming features of Q# are designed, making it easy to use for quantum computing 💖

## More Resources!

Want to learn more about arrays in Q# or Quantum Computing?
Check out the links below for some good resources! 😀

- [Learn Quantum Computing with Python and Q#, Chapter 8](https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp?a_aid=learn-qc-granade&a_bid=ee23f338)
- [`Microsoft.Quantum.Arrays` API Reference](https://docs.microsoft.com/qsharp/api/qsharp/microsoft.quantum.arrays)
- [Description of the type model for Q#](https://docs.microsoft.com/quantum/language/type-model#array-types)
- [Discussion of data structures in the Q# Libraries](https://docs.microsoft.com/quantum/libraries/standard/data-structures)
- [Copy and update expression Q# docs](https://docs.microsoft.com/quantum/language/expressions#copy-and-update-expressions)
- [Q# Blog post by Bettina Heim](https://devblogs.microsoft.com/qsharp/qsharp-06-language-features-and-more/)