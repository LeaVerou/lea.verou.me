---
title: Prompt Engineering is the new programming
draft: true
toc: true
tags:
  - prompt-engineering
  - programming
  - ai
  - end-user-programming
---

I recently saw a [LinkedIn post](https://www.linkedin.com/posts/jmspool_prompt-engineering-is-the-opposite-of-ai-activity-7383873901602287616-ADPV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAJpmUgBkMLJRw0u-OARLy0BU-UIeEEeqX8) by the great Joel Spolsky.
Among other things, he said:

> Prompt Engineering is the opposite of AI usability.
>
> Whenever anyone struggles to get their AI tool to do a desired action, the knee-jerk reaction is, “You need to engineer the prompts better.”
>
> If the AI tool were usable, users would have no trouble directing it to produce their desired results. That they need to master a specialized language to make it happen means it’s unusable.

This is an internally consistent thought, but starts from the premise that AI tools are akin to using an interface,
so [as we know](../../2025/user-effort), if people need to transform their input from their own mental model, to that of the interface, that is a failing of the interface.

However, interfaces need to be evaluated in the technological context that they are a part of.
Without that grounding, the [north star UI](../../2025/hovercar/) of any interface is no interface at all:
the software would read our minds and act accordingly or extract any information it needs without us having to do anything to help it along.
All you’d need to do to add a task to your to-do list would be to think that you need to do it (what a game changer for ADHDers that would be!).
There would be no airport security.
We would just walk to our gate, and sensors at the gate would scan us automatially and detect if any foul play is afoot.
Not only would we not need to get our laptops and liquids out, we would not even need a conveyor belt or body scanner.
Anything with higher friction than that is humans having to do additional work, because the technology is not quite there yet.

But comparing a user interface with an idealized version of itself that can only exist in science fiction films is not particularly useful.
So usually, we compare it to prior art in the space.
So, to evaluate the usability of an AI tool, the question is: what is the prior art we’re comparing it _to_?

Even before AI, the more general purpose a tool is, the more challenging it becomes to make it usable.
Compare a mortgage calculator to a spreadsheet application.
High-level tools make simple things easy, and low-level tools make complex things possible.
And the lowest-level tool of all is a programming language.

There are UIs built around encapsulating very specific types of prompts (e.g. make my selfie look professional, or improve my grammar), and many can do that with fantastic usability.
But when users are telling the computer *how* to accomplish a given task, they are essentially programming. General purpose AI tools are not UIs, they are IDEs. Prompt engineering is the next generation of programming, and the first time the end-user programming vision of the past 7 decades was finally realized. Prompt engineering is just the next level of programming language, encapsulating today’s programming languages at a higher level of abstraction, in the same way that 3GL programming languages encapsulated assembly.

With that framing, it has always been a specialized language, it’s just that for the first time it’s close enough to natural language that we even see the uncanny valley.

Also, for the first time in decades, we are witnessing a technology be so appealing to the masses, it goes mainstream before the usability know-how is there, so users are largely exposed to the raw technology. The last time I can think of this happening before was the Web itself. We’ll get there. Meanwhile, what exciting times we are living through!

## No determinism required

> How can something be considered programming if its execution isn’t repeatable? The specialized language is deterministic, but this new layer of abstraction is not - and is still a bridge to that underlaying language. (not sure how big-picture we’re going here, but that feels like an important difference)

Is determinism a requirement for an activity to be programming? If you’re an architect supervising a human that writes the actual code (but implementing your algorithms), is it programming? It’s not deterministic either.


There are philosophical schools of thought that argue that all life is deterministic.
But when people talk about determinism in this context, they are not making a philosophical point.
They are talking about things that they _perceive_ as deterministic.
These are the things that involve sufficiently few variables that we can build a mental model that predicts their outcome.
**Determinism is artificial.**
The more human things get, the less deterministic they feel, because the variables that affect their outcome are too many to do so.

But striving for determinism is a red herring.
Determinism does not carry any intrinsic value.
We have learned to seek determinism because it gives us a sense of control.
When you don't trust the tool to produce a good outcome, determinism allows you to produce a good outcome through iterative refinement.
But ultimately, **the end goal is a good outcome, not determinism for its own sake**.

That said, there are two ways to program with LLMs: One is to ask the AI tool to produce the desired result directly (akin to a programmer writing a one-off script to automate a specific task), the other to ask it to produce a traditional program that produces the desired result repeatably.
The latter will produce a program that is itself deterministic, even if the process of producing the program itself is not.
