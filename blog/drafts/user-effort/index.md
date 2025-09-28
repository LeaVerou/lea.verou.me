---
title: Designing for the economy of user effort
nutshell: Making simple things easy and complex things possible is a great start, but it's not enough.
draft: true
toc: true
tags:
  - web-standards
  - api-design
  - product-design
---

<figure class="float" style="max-width: 12em; position: relative; z-index: 1;">
<img src="images/Alan_Kay.jpg.webp">
<figcaption>

Alan Kay [[source]](https://aes2.org/community/technical-council/richard-c-heyser-memorial-lecture-series/details-of-heyser-lectures/memorial-lecture-at-109th-alan-kay-the-computer-revolution-hasnt-happened-yet/)</figcaption>
</figure>

One of my favorite product design principles of all time is Alan Kay’s _“Simple things should be simple, complex things should be possible”_.
^[[Kay himself replied on Quora and provided background on this quote](https://www.quora.com/What-is-the-story-behind-Alan-Kay-s-adage-Simple-things-should-be-simple-complex-things-should-be-possible). Don’t you just love the internet?]
I had been evangelizing it almost verbatim long before I heard of Kay’s quote.

As an interface design principle, _simple_ refers to **use cases that are simple from the user’s perspective**, i.e. the most common use cases.
Implementation complexity is entirely orthogonal,
or even [inversely correlated](#poc), as user experience is about encapsulating complexity so that users don’t have to deal with it.

Alan Kay’s maxim is deceptively simple, but its implications run deep.
It isn’t just a design ideal — it’s a call to continually balance friction, scope, and tradeoffs in service of the people using our products.

Since [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay) was a computer scientist, his quote is typically framed as a <abbr title="Programming Language">PL</abbr> or API design principle.
But that sells it short.
It applies to a much, _much_ broader class of interfaces.

I’m not aware of a name for this class, but it seems to have a lot to do with the _distribution of use cases_.
Products often cut scope by figuring out the ~20% of use cases that drive ~80% of usage — aka the [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle).
However, there are products with such diverse use cases that the Pareto Principle cannot apply to the product as a whole.
There are certainly common use cases and niche ones, but there is no clean 20% subset that drives 80% of usage — or anything close to it.
Instead, there is such a **long tail of niche use cases, that they become significant in aggregate**.
For lack of a better term, let's call these *long-tail products* (let me know if you’re aware of a better name, because this one sucks).

Nearly all creative tools are long-tail products.
That’s why it works so well for programming languages and APIs — because they are all creative tools.
But so are graphics editors, word processors, spreadsheets, and countless other interfaces that help humans create artifacts — even some you would never describe as a creative tool.

<article class="example" style="display: flex; flex-flow: row wrap; gap: 1rem; align-items: start">

<!-- No idea why this gets the wrong color with a heading anchor -->
<h4>Example: Google Calendar</h4>

You wouldn't describe Google Calendar as a creative tool, but it is definitely a tool that helps humans create artifacts (calendar events).
It is also a long-tail product:
there is a set of common, conceptually simple cases (one-off events at a specific time and date),
and a long tail of complex needs (recurring events, guests, multiple calendars, timezones, etc.).

Indeed, Kay’s maxim has clearly been used in its design.
The simple case has been so optimized that you can literally add a one hour calendar event with a single click (using a placeholder title).
A different duration can be set after that first click through dragging
^[Yes, typing can be faster than dragging, but minimizing homing between input devices improves efficiency more, see [KLM](https://en.wikipedia.org/wiki/Keystroke-level_model)].
But almost every possible edge case is also catered to — with additional user effort.

<figure>
  <video src="videos/google-calendar.mp4" muted autoplay loop loading="lazy"></video>
  <figcaption>
    Google Calendar is squarely a long-tail UI.
  </figcaption>
</figure>

Google Calendar is also an example of an interface that digitally encodes real-life,
demonstrating that complex use cases do not necessarily come from power users.
Often, the complexity is driven by life itself.
E.g. your taxes may be complex without you being a power user of tax software,
and your family situation may be unusual without you being a power user of every form that asks about it.

</article>

The Pareto Principle is still useful for individual features, as they tend to be more narrowly defined.
E.g. there _is_ a set of spreadsheet formulas (actually much smaller than 20%) that do drive >80% of formula usage.

While creative tools are the poster child of long-tail products,
there are _long-tail components_ in many [transactional](https://medium.com/design-bootcamp/overfitting-and-the-problem-with-use-cases-337d9f4bf4d7) interfaces such as e-commerce or meal delivery (e.g. result filtering & sorting, product personalization interfaces, etc.).

<figure class="width-m">

![](images/airbnb.png)

<figcaption>

Airbnb’s filtering UI here is definitely making an effort to make simple things easy (personalized shortcuts!) and complex things possible through granular controls.
</figcaption>
</figure>

**Which use cases are complex depends on product scope.**
Many products succeed by focusing on making common things easy and explicitly defining complex things as out of scope.
Kay's principle still applies — just more narrowly.
Instagram’s complex cases are vastly different than Photoshop’s complex cases, but both have a range.

## It’s all about the curve { #curve }

Picture a plane with two axes: the horizontal axis being the **complexity** of the desired task from the user's perspective,
and the Y axis the **effort** (cognitive and/or physical) users need to expend to accomplish their task using a given interface.

Following Kay’s maxim guarantees these two points:
- _Simple things being easy_ guarantees a point on the lower left (low use case complexity → low user effort).
- _Complex things being possible_ guarantees a point _somewhere_ on the far right.
The lower user effort the better, but higher up is **acceptable**.

<figure class="outlined width-m">
  <object data="images/curve-alankay.svg"></object>
  <figcaption>
    Alan Kay's maxim visualized.
  </figcaption>
</figure>

But even if we get these two points — **what about all the points in between?**
There are a ton of different ways to connect them, and they produce vastly different overall user experiences.
How does your interface fare when it comes to a use case that is only _slightly_ more complex?
Are users yeeted into the deep end, or do they only need to invest a proportional, incremental amount of effort to achieve their goal?

Meet the **complexity-to-effort curve**, the most important usability metric you've never heard of.

<figure class="outlined width-m">
  <object data="images/curve-multiple.svg"></object>
  <figcaption>

  For delightful user experiences, making simple things easy and complex things possible is not enough — the transition between the two should also be smooth.
  </figcaption>
</figure>

You see, **simple use cases are the [spherical cows in space](https://en.wikipedia.org/wiki/Spherical_cow) of product design**.
They work _great_ for prototypes to convince stakeholders, or in marketing demos, but the real world is _messy_.
Most artifacts that users need to create to achieve their real-life goals rarely fit into your "simple" flows completely, no matter how well you’ve done your homework.
They are _mostly_ simple — just with a wart here or there.
For a creative interface to be usable **in practice**, longterm, it also needs to ensure that user effort increases incrementally as use case complexity increases.


## Avoid usability cliffs { #cliffs }

<aside class="pullquote">

> Incremental user effort cost should be proportional to incremental value gained.


</aside>

A model with surprising predictive power is to **treat user effort as a currency** that users are spending to buy solutions to their problems.
Nobody likes paying it;
in an ideal world software would read our mind and execute perfectly with zero user effort.
But since we don’t live in such a world, users are typically willing to pay more in effort when they feel their use case warrants it.

The problems arise when the cost doesn't feel warranted, when there is a **mismatch** between a use case's anticipated and actual user effort cost.
When a goal _feels_ simple, yet requires a lot of user effort to accomplish.
The all too familiar "*all I want to do is _________, it shouldn't be this hard!*".


If you had a pizza shop, you would never design your pricing structure such that adding ham to a pizza triples its price.
And yet, when it comes to user effort, this type of "pricing" is surprisingly common.
When a slight increase in complexity results in a significant increase in user effort cost, we have a **usability cliff**.
Usability cliffs make users feel cheated, just like the customers of our fictitious pizza shop.


<figure class="width-m">
  <object data="images/curve-cliff.svg"></object>
  <figcaption>

    A usability cliff is when a small increase in use case complexity requires a large increase in user effort.
  </figcaption>
</figure>

You often see these cliffs in products that make simple things easy and complex things possible by providing two entirely disjoint flows:
a super high level one that caters to the most common use case with little flexibility, and a very low-level one that is an escape hatch: it lets users do whatever, but they have to recreate the solution to the simple use case from scratch before they can tweak it.

<article class="example">

<h4>Example: The HTML video element</h4>

Simple things are certainly easy: all we need to get a video with a nice sleek set of controls that work well on every device is a single attribute: `controls`.
We just slap it on our `<video>` element and we’re done with a single line of HTML:

<figure class="multiple" style="align-items: center;">

```html { style="font-size: 150%" }
<video src="videos/cat.mp4" controls></video>
```
➡️
<img src="images/cat-video-player.png" alt="A cat video player with a sleek toolbar" style="flex: .5">
</figure>

Now let’s suppose use case complexity increases _juuuust a little bit_.
Maybe I want to add buttons to jump 10 seconds back or forwards.
Or a language picker for subtitles.
Or just to hide the volume control on a video that has no audio track.
None of these are particularly niche, but the default controls are all-or-nothing: the only way to change them is to reimplement the whole toolbar from scratch, which takes hundreds of lines of code to do well.

Simple things are easy and complex things are possible.
But once use case complexity crosses a certain (low) threshold, user effort abruptly shoots up.
**That's a usability cliff.**

</article>


## Maximize signal-to-noise ratio { #signal-to-noise }


<aside class="pullquote">

> Keep user effort close to the minimum necessary to declare _intent_
</aside>

If _incremental value should require incremental user effort_, an obvious corollary is that **things that produce no value should not require user effort**.
This is also nicely explained with the model of user effort as a currency: who likes paying without getting anything in return?

If you like eating out, this may be a familiar scenario:

> — I would like the rib-eye please, medium-rare.<br>
> — Thank you sir. How would you like your steak cooked?

Annoying, right?
And yet, this is how a ton of user interfaces work; expecting users to communicate the same intent multiple times in slightly different ways.

**Respect user effort.**
Treat user effort as a scarce resource and keep it close to the minimum necessary to declare _intent_.
Do not require users to do work that confers them absolutely no benefit, and could have absolutely been handled by the UI.
**If it can be derived from other input, it should be derived from other input.**

A once ubiquitous example that is thankfully going away, is the credit card form which asks for the type of credit card as a separate input.


<figure class="float">

![](images/cc-type.png)

<figcaption>

Source: [NNGroup](https://www.nngroup.com/articles/edit-credit-card/) (adapted).
</figcaption>
</figure>

Credit card numbers are designed so that the type of credit card can be determined from the first four digits.
There is zero reason to ask for it separately.
Beyond wasting user effort, duplicating input that can be derived introduces an **unnecessary error condition** that you now need to handle:
what happens when the entered data is not consistent?

User actions that meaningfully communicate intent to the interface, are **signal**.
Any other step users need to take to accomplish their goal, is **noise**.
This includes communicating the same input more than once,
providing input separately that could be derived from other input with complete or high certainty,
transforming input from their mental model to the interface's mental model,
or expending effort that does not further the interface's understanding of user intent (either via GUI actions or writing boilerplate code).

Some noise is unavoidable.
The only way to have 100% signal-to-noise ratio would be if the interface could mind read.
But too much noise increases friction and obfuscates signal.
**Boilerplate is the UX version of red tape**: hoops you need to jump through to accomplish your goal, that serve no obvious purpose in furthering said goal except for the fact that they are required.
And we all know how people feel about red tape.

A short yet demonstrative example is the web platform’s DOM methods for removing an element from the DOM tree.
To signal _intent_, the user needs to communicate two things:
(a) **what** they want to do (remove an element) the element to remove, and (b) **which element** they want to remove.
Anything beyond that is noise.

The modern [`element.remove()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) DOM method has an extremely high signal-to-noise ratio.
It’s hard to imagine a more concise way to signal intent.
However, it replaced the older [`parent.removeChild(child)`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) method, which had much worse ergonomics.
It required two parameters: the element to remove, and its parent.
But the parent is not a separate source of truth — it would _always_ be the child node’s parent!
As a result, its actual usage involved boilerplate, where
developers had to write a much noisier `if (element.parentNode) element.parentNode.removeChild(element)` (frequently encapsulated in utility functions).
^[Yes, today it would have been `element.parentNode?.removeChild(element)`, which is a little less noisy, but this was before the optional chaining operator.]

It may seem small, but this is only because the overall code is small.
The actual difference in signal-to-noise ratio is staggering.
The exact numbers (81% vs 20% here) vary based on specifics,
but when the difference is meaningful, it is so large it transcends such details.

<figure class="width-m">
  <object data="images/code-signal-to-noise.svg"></object>
  <figcaption>
    The difference in signal-to-noise ratio is staggering: 81% vs 20% in this case.
  </figcaption>
</figure>

As an exercise for the reader, try to calculate the signal-to-noise ratio of a [Bootstrap accordion](https://getbootstrap.com/docs/5.3/components/accordion/#example).
This is exactly why the industry gravitated towards component architectures: they increase signal-to-noise ratio by encapsulating boilerplate.

When you view user effort as a currency, **overpriced** interfaces with low signal-to-noise ratio make users feel **ripped off**.
On the contrary, interfaces where every bit of user effort required is meaningful and produces tangible value are a joy to use.
When the interface is on their side, gently helping them along with every step, instead of treating their time and energy as disposable.
The user feels like they’re getting a sweet deal: they get to spend _less_ than they had budgeted for!
Doesn't that feel great?

It does not always have to be a radical innovation;
don't underestimate the power of small touches.
A zip code input that auto-fills city and state,
a web component that automatically adapts to its context without additional configuration,
a pasted link that automatically defaults to the website title,
a freeform date that is correctly parsed into structured data,
a login UI that remembers whether you have an account and which service you've used to log in before,
an authentication flow that takes you back to the page you were on before.
**Sometimes many small things can collectively make a big difference — the polar opposite of death by a thousand paper cuts.**


## You cannot uncover friction by asking users { #asking-users }

<aside class="pullquote">

> Users are much more vocal about things not being possible, than things being hard.
</aside>

When pointing out friction issues in [design reviews](/consulting/#design-reviews),
I have sometimes heard "_users have not complained about this_".
This uncovers a fundamental misunderstanding about the psychology of user feedback.

**Users are much more vocal about things not being possible, than about things being hard.**
Friction is transient.
Once the user accomplishes their goal and moves on to the next task, the motivation to file a complaint evaporates.
Additionally, friction is often _death by a thousand paper cuts_, and filing a thousand complaints doesn't usually make for a good ROI for the user.
However, it is well understood that [emotions persist for much longer than their initial trigger](https://journals.sagepub.com/doi/abs/10.1037/1089-2680.2.3.271).
**The negative emotions the friction created persist, and build resentment over time, eroding customer loyalty.**
Users may not even fully understand why using the software is unpleasant, the concrete details fade, and only the feeling remains.
On the contrary, things not being possible surface much more frequently, as they don't go away — filing a complaint is the only actionable option.
This also means that when users reach the breaking point and actually complain about friction, you better listen.

Second, **user complaints are filed when there is a mismatch in expectations**.
Things are not possible but the user feels they should be, or interactions cost more user effort than the user had budgeted,
for example because they know that a competing product offers the same feature for less.
Often, users have been conditioned to expect poor user experiences,
either because _all_ options in the category are high friction, or because the user is too novice to know better
^[When I was running user studies at MIT, I’ve often had users exclaim “I can't believe it! I tried to do the obvious simple thing and it actually worked!”].
So they begrudgingly pay the price, and don’t think they have the right to complain, because it's just how things are.

You could ask "_if all competitors are equally high friction, how does this hurt my metrics?_"
First, you’re not merely competing with other products in the same category, you’re competing with all solutions to the same problem — and with no solution at all (nonconsumption),
where the most fertile ground for growth often is (see [Jobs-to-be-Done](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)).
Even when it comes to retention, **users can always flock to a different product category altogether**, e.g. building native apps instead of web apps.
**An unmet market need for a better product is a vulnerability in your market position** that can be exploited by a competitor at any point.

Historical examples abound.
When it comes to actual currency, a familiar example is **Airbnb**: Until it came along, nobody would complain that a hotel of average price is expensive — it was just average.
If you couldn't afford it, you just couldn't afford to travel, period.
But once Airbnb showed there is a cheaper alternative for hotel prices _as a whole_, tons of people jumped ship.
It’s the same when the currency is user effort.
**Stripe** took the payment API market by storm when it demonstrated that payment APIs did not have to be so high friction.
**iPhone** disrupted the smartphone market when it demonstrated that no, you did not have to be highly technical to use a smartphone.
The list goes on.

Unfortunately, friction is hard to quantify, to the dismay of those who think they can replace product vision with a good spreadsheet.
With good telemetry you can detect some friction (e.g. through dead clicks), but there is no KPI to measure friction as a whole.
And no, [NPS](https://en.wikipedia.org/wiki/Net_promoter_score) isn't it, and [you’re using it wrong anyway](https://jmspool.medium.com/net-promoter-score-considered-harmful-and-what-ux-professionals-can-do-about-it-fe7a132f4430).
Instead, the negative emotions from friction will erode nearly all metrics (churn, conversion, etc.), and product folks will run circles like [blind men touching an elephant](https://en.wikipedia.org/wiki/Blind_men_and_an_elephant) trying to figure out why.
This is why it is so important for data to be supplemented by actual **product vision** and **proactive, [first-principles](https://www.intercom.com/blog/peeling-back-to-first-principles/) design**.

[Steve Jobs](https://en.wikipedia.org/wiki/Steve_Jobs) may have had his flaws, but he was exactly the kind of visionary who proactively and aggressively eliminated friction.
He disrupted entire industries by challenging the status quo and pushing back on friction that was presented as inevitable.
He saw every unnecessary choice, delay, or piece of jargon as friction to be eliminated, and did not need KPIs to tell him so.
_Do mice really need multiple buttons? Do computers really need a manual?
Does installing software really need multiple steps?
Do smartphones really need a stylus?_
Of course, this only worked because he did not have a manager to convince.
It takes a lot of trust to _really_ delegate product vision without actively diluting it.

So, if there is no metric for friction, how do you identify it?

1. **Usability testing** lets you actually observe firsthand what things are hard instead of having them filtered through users' memories and expectations.
2. [**Design reviews/audits**](/consulting/#design-reviews) by usability experts is complementary to usability testing, as it often uncovers different issues. Design reviews are also great for maximizing the effectiveness of usability testing by getting the low-hanging fruit issues out of the way before it.
3. **Dogfooding** is unparalleled as a discovery tool — nothing else will identify as many issues as using the product yourself, for your own, real needs.
However, it's important to keep in mind that you’re a huge power user of your own product.
You cannot surface learnability issues ([curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge)) and you _will_ surface issues no-one else has.
Dogfooding is a fantastic discovery tool, but you still need user research to actually evaluate and prioritize the issues it surfaces.


## User needs come first { #poc }

Reducing friction rarely comes for free, just because someone had a good idea.
These cases do exist, and they are great, but it usually takes sacrifices.
And without it being an organizational priority, it's very hard to steer these tradeoffs in that direction.

A common tradeoff is implementation complexity.
Simplifying user experience is usually a process of driving the complexity inwards and encapsulating it in the implementation.
Explicit, low-level interfaces are far easier to implement, which is why there are so many of them.
Especially as deadlines loom, engineers will often push towards externalizing complexity into the user interface, so that they can ship faster.
And if Product leans more data-driven than data-informed, it's easy to look at customer feedback and conclude that what users need is more features.

<article class="example">

<figure style="align-items: end;">

![](images/faucet-1.jpg)
![](images/faucet-2.jpg)

<figcaption>
Simple to use is often at odds with simple to implement.
</figcaption>
</figure>

The first faucet is a _thin abstraction_: it exposes the underlying implementation directly, passing the complexity on to users, who now need to do their own translation of temperature and pressure into amounts of hot and cold water.
It prioritizes implementation simplicity at the expense of wasting user effort.

The second design prioritizes user needs and _abstracts_ the underlying implementation to support the user's mental model.
It provides controls to adjust the water temperature and pressure independently, and internally translates them to the amounts of hot and cold water.
This interface sacrifices some implementation simplicity to minimize user effort.

</article>

This is why I’m skeptical when someone advocates for "simplicity".
Advocating for "simplicity" is a platitude — everyone agrees that all else being equal, simpler is better!
**It’s the tradeoffs between different types of simplicity that are tough.**

In some cases, reducing friction carries tangible financial risks, which makes leadership buy-in even more important.
This kind of tradeoff cannot be made by an individual designer — it requires usability as a priority to trickle down from the top of the org chart.

<article class="example">

<img src="images/oslo-train.webp" alt="The Oslo train ticket machine, with a screen saying 'Swipe card' and a single slot" style="float: inline-end; width: clamp(5em, 10vw, 9em); margin-inline-start: 1em; margin-block-end: .5em">

The Oslo airport train ticket machine is the epitome of a high signal-to-noise interface.
You simply swipe your credit card to enter and you swipe your card again as you leave the station at your destination.
That's it. No choices to make. No buttons to press. No ticket.
You just swipe your card and you get on the train.
Today this may not seem radical, but back [in 2003, it was groundbreaking](https://flytoget.no/en/about/our-story/).

To be able to provide such a frictionless user experience, they had to make a financial tradeoff:
it does not ask for a PIN code, which means the company would need to simply absorb the financial losses from fraudulent charges (stolen credit cards, etc.).


</article>

When user needs are prioritized at the top, it helps to cement that priority as an **organizational design principle** to point to when these tradeoffs come along in the day-to-day.
Having a design principle in place will not instantly resolve all conflict, but it helps turn conflict about priorities
into conflict about whether an exception is warranted, or whether the principle is applied correctly, both of which are generally easier to resolve.
Of course, for that to work everyone needs to be on board with the principle.
But here's the thing with design principles (and most principles in general): they often seem obvious in the abstract, so it's easy to get everyone to agree.
It's when you're faced with concrete tradeoffs when it gets tough.

The Web Platform's version of this principle is called [Priority of Constituencies](https://www.w3.org/TR/design-principles/#priority-of-constituencies):

> "User needs come before the needs of web page authors, which come before the needs of user agent implementors, which come before the needs of specification writers, which come before theoretical purity."

This highlights another key distinction.

### Consumers over Producers

It’s not about prioritizing user needs over developer needs, it's about prioritizing **consumer needs over producer needs**.
Developers are just one type of producer.

- Consumers are typically more numerous than producers, so this **minimizes collective pain**.
- Producers are typically more **advanced**, and can handle more complexity than consumers. I've heard this principle worded as "_Put the pain on those who can bear it_", which emphasizes this aspect.
- Producers are typically more **invested**, and less likely to leave

The web platform has multiple tiers of producers:
- **Specification writers** are at the bottom of the hierarchy, and thus, can handle the most pain (_ow!_ 🥴)
- **Browser developers** ("_user agent implementors_" in the PoC) are consumers when it comes to specifications, but producers when it comes to the web platform
- **Web developers** are consumers when it comes to the web platform, but producers when it comes to their own websites

Even within the same tier there are producer vs consumer dynamics.
When it comes to web development libraries, the web developers who write them are producers and the web developers who use them are consumers.

This distinction also comes up in extensible software, where plugin authors are still consumers when it comes to the software itself,
but producers when it comes to their own plugins.
It also comes up in [dual sided marketplace products](https://en.wikipedia.org/wiki/Two-sided_market)
(e.g. Airbnb, Uber, etc.),
where buyer needs are generally higher priority than seller needs.

## Conclusion

In the end, “_simple things simple, complex things possible_” is table stakes.
The key differentiator is the [shape of the curve](#curve) between those points.
Products win when effort scales with complexity, [cliffs](#cliffs) are engineered out, and [every interaction declares a meaningful piece of user intent](#signal-to-noise).
That doesn't just happen by itself.
It involves hard tradeoffs, saying no a lot, and prioritizing user needs at the organizational level.
Treating user effort like real money, forces you to design with restraint; if you prioritize [consumers over producers](#consumers-over-producers), you place the pain where it’s best absorbed.
Do those two things consistently, and the interface feels **delightful** in a way that sticks.
Delight turns into trust.
Trust into loyalty.
Loyalty into product-market fit.
