---
title: The economy of user effort Part 2
nutshell: The holy grail of good UI and API design is making complex things possible and simple things easy. But it's far from enough.
draft: true
toc: true
tags:
  - web-standards
  - api-design
  - product-design
---

## Respect user effort

If you like eating out, this may be a familiar scenario:

> — I would like the rib-eye, medium-rare please.
> — Thank you sir. And how would you like your steak cooked?

Infuriating, right?
And yet, this is how a ton of UIs work.

<aside class="pullquote">

> Keep user effort close to the minimum necessary to declare _intent_
</aside>

If _incremental value should require incremental user effort_, an obvious corollary is that **things that produce no value should not require user effort**.
And yet, it's surprising how often interfaces require users to do work that confers them absolutely no benefit,
such as dealing with complexity that is not relevant to them, or doing work that the UI should be doing for them.

Treat user effort as a scarce resource and keep it close to the minimum necessary to declare _intent_.
The user experience of expending effort without getting any value in return just because an interface requires jumping through certain hoops to use is demoralizing;
the UI equivalent of red tape.
On the other hand, interfaces where every bit of user effort required is meaningful and produces tangible value are a joy to use.
Guess which one is more likely to minimize churn?

@@@ lazy coding prioritizing developer convenience over user experience

### Reveal complexity progressively

Complexity should be tucked away until it's needed.
Users should not have to deal with complexity that is not relevant to them.
_Enterprise software, I’m looking at you._

For example, individual user accounts should not need to set up "workspaces" separately from setting up their account, or designate representatives for different business functions (legal, accounting, etc.).
This is complexity that belongs to complex use cases leaking out to simple ones.
Any concepts exposed through a UI should add user-facing value.
If a concept does not add user-facing value, it should not be exposed to users.

And for APIs, this emphasizes the importance of sensible defaults and shortcuts.
Users should be able to use an API without making micro-decisions about things they don't care about or learning parts of the API that are not relevant to them.

My favorite example of this is the SVG DOM.

It's fantastic that it has been typed from the get go.
It's great that it provides access to both the animated value and the base value.<br>
It's _not_ great that all this complexity is thrown at users whether it's relevant to them or not.<br>
There is no simple way to just get a value and stuff it elsewhere, like there is for the HTML DOM.
All the complexity of the more advanced use cases is thrown at users whether it's relevant to them or not.<br>
Complex things are possible, but simple things are not easy.
There is no curve, just a horizontal line.

<figure>
  <img src="images/svg-dom.png" style="flex: 1.3" alt="Screenshot of a console showing someone repeatedly trying to read the actual radius of an SVG circle, until eventually they get it right: circle.r.baseVal.value">
  <object data="images/curve-svg-dom.svg"></object>
  <figcaption>
    It's great that the SVG DOM supports all this.
    It's not great that users need to deal with it whether it's relevant to them or not.
  </figcaption>
</figure>

### Support the user's mental model

Requiring users to perform mental gymnastics to translate their mental model to the interface's is another form of disrespecting user effort.
What does that look like?
Take a look at these two common types of faucets:

<figure style="align-items: end;">

![](images/faucet-1.jpg)
![](images/faucet-2.jpg)

<figcaption>
Simple to use does not necessarily mean simple to implement.
</figcaption>
</figure>

When using a bathroom faucet, the user's mental model is around water temperature and pressure, not hot and cold water amounts.
It's the underlying implementation that expects amounts of hot and cold water as inputs.

The first faucet is a _thin abstraction_: it exposes the underlying implementation directly, passing the complexity on to users, who now need to do their own translation of temperature and pressure into amounts of hot and cold water.
It prioritizes implementation simplicity at the expense of wasting user effort.

The second design prioritizes user needs and _abstracts_ the underlying implementation to support the user's mental model.
It provides controls to adjust the water temperature and pressure independently, and internally translates them to the amounts of hot and cold water.
This interface sacrifices implementation simplicity to minimize user effort.

Implementation details leaking out into the UI is a very common UX antipattern.
Sometimes it happens simply because abstraction is hard.
It's much easier to expose what's already there than to rethink it.
Other times, it reflects a prioritization of developer convenience over user experience.
We'll address this in the next section.

### Compute what can be computed

Users should not have to expend cognitive effort computing things that the interface could be computing for them.
If you _can_ calculate something from user input, don't require them to enter it manually.
This does not only reduce superfluous user effort, it also reduces preventable errors.

As an example, take the `removeChild()` DOM method, used to remove a child element from its parent.
In the abstract, its signature seems reasonable:

```js
parent.removeChild(child);
```

But this means two variables that need to have a very specific relationship are entered as separate inputs.
This introduces an error condition, for the case where these variables _don't_ have that relationship.
In practice, the relationship is enforced by having a single variable, and deriving the other one from it:

```js
element.parentNode?.removeChild(element);
```

While this eliminates the error condition, it still adds superfluous gruntwork into the user experience.
**User intent is muddled by noise.**

Contrast this with the newer:

```js
element.remove();
```

Now code reflects the user intent with no superfluous noise.
If the element parent is required for the operation of removing the element, it is simply computed from it by the implementation of the `remove()` method.

### Reduce gruntwork and boilerplate


Boilerplate is repetitive syntax that users need to include without thought, because it does not actually communicate intent.
It's just a little song and dance that the user needs to do _before_ they can communicate intent.

Just like computation, this kind of gruntwork is much better suited to machines, rather than humans.

There are three different causes for this:
1. Not enough effort has been put into making simple things easy, i.e. complexity is not being revealed progressively when needed
2. It is driven by a need to avoid being "opinionated"
3. The wrong technology is being used to solve the problem and does not support sufficient automation

For 1, see the previous section on [revealing complexity progressively](#revealing-complexity-progressively).

Let’s talk a bit about 2, as this is a common point of friction between UX/product folks and engineers.





If it can be generated, generate it.




The previous point is about reducing cognitive user effort by eliminating superfluous computation from the user experience,
whereas this is about reducing physical effort by not requiring manual effort that does not advance the interface's understanding of user intent.



Let’s take an example from Bootstrap:

@@@@@






<!-- Even if you're not 100% right, it's better to provide a customizable default that works in 80% of cases and requires effort to correct in 20% of cases than to make 100% of users expend effort so that the UI is not "opinionated" (unless there is truly no sensible option or there are other considerations to not setting a default, e.g. inclusivity). -->



Do not require users to type boilerplate.
They are not your monkeys.

Specifying defaults that nearly never need customization also fall in this category, even if they _technically_ are declaring intent.
Intent should be the delta from the average case, otherwise you may as well require users to specify your entire implementation.
It's your interface




### Apply the principle _recursively_

<aside class="pullquote">

> Common complex things should be easier than uncommon complex things
</aside>

Long-tail UIs rarely have a uniform long tail.
Typically, some complex use cases are more simple than others.
Therefore, one good way to avoid cliffs is to apply the principle *recursively*.
Once you've made simple use cases easy, consider the remaining use cases. Which ones are simplest among them?
Then optimize them too.

This was a big reason why [PrismJS](https://prismjs.com), a syntax highlighting library I wrote in 2012, became so popular,
reaching over 2 *billion* downloads on npm and being used on some pretty huge websites ^[The other one being that it was the only one at the time that made syntax highlighting actually _look good_].

Simple things were easy: highlighting code on a website that used good HTML took nothing more than including a CSS file and a script tag.
Because its only hook was regular HTML, and there was no Prism-specific "handshake" in the markup, it was able to work across a large variety of toolchains, even tooling where authors had little control over the HTML produced (e.g. Markdown).

Complex things were possible: it included a simple, yet extensive system of [hooks](https://www.npmjs.com/package/blissful-hooks) that allowed [plugin](https://prismjs.com/#plugins) authors to modify its internal implementation to do whatever by basically inserting arbitrary code at certain points and modifying state.

But beyond these two extremes, the principle was applied _recursively_:
**Common complex things were also easier than uncommon complex things.**
For example, while adding a new language definition required more knowledge than simply using the library, a lot of effort went into reducing both the effort and the knowledge required to do so.
Styling required simple CSS, styling simple, readable class names.
And as a result, the ecosystem flourished with hundreds of contributed languages and themes.

This is a very common pattern for designing extensible software:
**a powerful low-level plugin architecture,
with easier _shortcuts_ for common extensibility points**.

### Tweakable over take-it-or-leave-it

Many complex use cases are just simple use cases with a few tweaks.
Rather than canned take-it-or-leave-it solutions for simple cases (which as we've seen, tend to produce cliffs),
a good way to smoothen the curve and require only _incremental effort for incremental value_ is to make these solutions **tweakable**.
Tweaking tends to be much easier than starting from scratch, so you want to limit starting from scratch to the cases where it's actually desirable.

With tweakable shortcuts, even if the simple solution does not fully cover the use case, the only additional user effort required is that needed to tweak it so that it does.
The flow serves a dual purpose: **it gives simple use cases a solution, and complex use cases a headstart**.

This is the core issue with the `<video>` example:
The way it makes simple things easy is completely inflexible.
There are no extensibility points, no way to customize anything.
It’s take it or leave it.

While web components are not typically the poster child of good user experiences, there is one aspect of web component APIs that allows them to provide a very smooth power-to-effort curve: [slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots).
Slots are predefined insertion points with defaults.
If I’m writing a `<my-video>` component, I can define its default play button like this:

```html
<button id="play">
	<slot name="play-button-icon">▶️</slot>
</button>
```

And now, a component consumer can use `<my-video src="cat.mp4">` and get a default play button, or slot in their own icon:

```html
<my-video src="cat.mp4">
	<i slot="play-button-icon" class="fa-solid fa-play"></i>
</my-video>
```

But the best thing about slots is that they can be **nested**.
This means that component authors can defensively wrap parts of the UI in slots, and component consumers can override just the parts they need, at the granularity they need.
For example, `<my-video>` could also wrap the default play button itself in a slot:

```html
<slot name="play-button">
	<button id="play">
		<slot name="play-button-icon">▶️</slot>
	</button>
</slot>
```

And then, component consumers can _still_ only override the icon, or override the whole button:

```html
<my-video src="cat.mp4">
	<button slot="play-button">
		<i slot="play-button-icon" class="fa-solid fa-play"></i>
	</button>
</my-video>
```

Empty slots facilitate **insertion points**.
For example, the `<my-video>` component author could support inserting controls before or after the play button like so:

```html
<slot name="play-button-before"></slot>
<slot name="play-button">
	<button id="play">
		<slot name="play-button-icon">▶️</slot>
	</button>
</slot>
<slot name="play-button-after"></slot>
```

And then, component consumers can use them to add additional controls:

```html
<my-video src="cat.mp4">
  <button slot="play-button-before" class="skip-backwards"><svg>…</svg></button>
  <button slot="play-button-after" class="skip-forwards"><svg>…</svg></button>
</my-video>
```

Given enough extension points, users would only need to resort to building custom controls from scratch when they truly have a very complex use case that cannot be implemented as a delta over the default controls.
That smoothens out the curve, which may look more like this:

<figure class="width-m">
  <object data="images/curve-slots.svg"></object>
  <figcaption>
    A custom video component that uses slots extensively can smoothen the curve.
  </figcaption>
</figure>

Let’s get back to Google Calendar for another example.
Suppose we want to create a recurring event.
Even within the less simple use case of creating a recurring event, there are simpler use cases (e.g. repeat every week),
and more complex ones (e.g. every third week, on the third Sunday of the month, twice a week etc.).

Google Calendar has used *tweakable presets* to make simple things easy and complex things possible at the micro-interaction level.
Simple things are easy: you just pick a preset.
But these are not just presets, they are also tweakable shortcuts.
They also serve as entrypoints into the more "advanced" interface that can be used to set up almost any rule — with enough user effort.

**Tweakable presets** smoothen the curve exactly because they contain the additional user effort to only the delta between the user's use case, and the simpler use case the interface is optimized for.
By doing that, they also become a **teaching tool** for the more advanced interface, that is much more effective than help text, which is typically skimmed or ignored.

<figure>

<img src="images/recur.png" alt="Google Calendar recurring event presets">
<img src="images/recur-custom.png" alt="Google Calendar recurring event customization dialog" style="flex: 1.6">

<figcaption>
Google Calendar making simple things easy and complex things possible at the micro-interaction level.
</figcaption>
</figure>


### A hierarchy of abstractions

So far, both tweakable abstractions we have seen revolved around extensibility and customization — making the solution to simple use cases more flexible so it can support medium complexity use cases through customization.

The version of this on steroids is defining super low-level primitives as building blocks that make complex things possible,
and then composing them into various high-level abstractions that make simple things easy.

My favorite end-user facing product that does this is [Coda](https://coda.io).
If you haven’t heard of Coda, imagine it as a cross between a spreadsheet, a database, and a document editor.

Coda implements its own formula language, which is a way for end users to express complex logic through formulas.
Think spreadsheet formulas, but a lot better.
For many things, the formula language is its lowest level primitive.

Then, to make simple things easy, Coda provides a UI for common cases, but here’s the twist:
The UI is generating formulas behind the scenes that users can then tweak!
Whenever users need to go a little beyond what the UI provides, they can switch to the formula editor and tweak the generated formula,
which is infinitely easier than writing it from scratch.

Let’s take the filtering interface as an example, which I [have written about before](../../2023/eigensolutions/#coda-filtering).
At first, the filtering UI is pretty high level, designed around common use cases:

<figure>

![](../../2023/eigensolutions/images/coda-filter-1.png)
![](../../2023/eigensolutions/images/coda-filter-2.png)

<figcaption>

Another nice touch: "And" is not just communicating how multiple filters are combined, but is also a control that lets users edit the logic.

</figcaption>

</figure>

For the vast majority of use cases, the high-level UI is perfectly sufficient.
If you don’t need additional flexibility, you may not even notice the little ***f*** button on the top right.
But for those that need additional power it can be a lifesaver.
That little *f* indicates that behind the scenes, the UI is actually generating a *formula* for filtering.
Clicking it opens a formula editor, where you can edit the formula directly:

![](../../2023/eigensolutions/images/coda-filter-editor.png)

I suspect that even for the use cases that require that escape hatch, a small tweak to the generated formula is all that is necessary.
The user may have not been able to write the formula from scratch, but **tweaking is easier**.
As one data point, the one time I used this, it was just about using parentheses to combine AND and OR differently than the UI allowed.

<!-- This also makes another point:
**Presets don’t have to be predefined.**
They can be dynamically generated based on the current state (e.g. in this case the table columns and their types).
Even the Google Calendar presets are subtly dynamic, using the selected date as input. -->

Smoothening the curve is not just about minimizing user effort for a theoretical user that understands your interface perfectly (efficiency), it's also about minimizing the effort required to get there (learnability).
The fewer primitives there are, the better.
Defining high-level abstractions in terms of low-level primitives is also a great way to simplify the user's mental model and keep cognitive load at bay.
It's an antipattern when users need to build multiple different mental models for accomplishing subtly different things.

When high-level abstractions are defined as predefined configurations of the existing low-level primitives, there is only one mental model users need to build.
The high level primitives _explain_ how the low-level primitives work, and allow users to get a headstart for addressing more complex use cases via tweaking rather than recreating.
And from a product design perspective, it makes it much easier to achieve smooth power-to-effort curves because you can simply define intermediate abstractions rather than having to design entirely separate solutions ad hoc.

For the Web Platform, this was basically the core point of the [Extensible Web Manifesto](https://extensiblewebmanifesto.org/),
which those of you who have been around for a while may remember:
It aimed to convince standards editors and browsers to ship low-level primitives that _explain_ how the existing high-level abstractions worked.

#### Low-level doesn't mean low implementation effort

**Low-level primitives** are building blocks that can be composed to solve a wider variety of user needs, whereas **high-level abstractions** focus on eliminating friction for a small set of user needs.
Think of it that way: a freezer meal of garlic butter shrimp is a high-level abstraction, whereas butter, garlic, and raw shrimp are some of the low-level primitives that go into it.

The low-level vs high-level distinction refers to the **user experience**, not the underlying implementation.
Low-level primitives are not necessarily easier to implement, and are often much harder.
Since they can be composed in many different ways, there is a much larger surface area that needs to be designed, tested, documented, and supported.
It's much easier to build a mortgage calculator than a spreadsheet application.

As an extreme example, a programming language is one of the most low-level primitives possible: it can build anything with enough effort, and is not optimized for any particular use case.
Compare the monumental effort needed to design and implement a programming language to that needed to implement e.g. a weather app, which is a high-level abstraction that is optimized for a specific use case and can be prototyped in a day.

As another extreme example, it could even be argued that an AI agent like ChatGPT is actually a _low-level_ primitive from a UX perspective,
despite the tremendous engineering effort that went into it.
It is not optimized for any particular use case, but with the right prompt, it can be used to effectively replace many existing applications.
The [floor and ceiling model](../../2023/eigensolutions/#floor-ceiling) also explains what is so revolutionary about AI agents: despite having a very high ceiling, their floor is as low as it gets.

## Which comes first, convenience or capability?

Alan Kay's maxim only deals with _what_ to do, not _when_ to do it.
There is no discussion around **prioritization**.
But in the real world, the _when_ is just as important as the _what_.

Sure, let's make simple things easy and complex things possible.
But **which solution do you ship _first_?**
Which one do you design first?

Stay tuned for Part 2, which will cover exactly this!
