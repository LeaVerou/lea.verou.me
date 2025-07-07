---
title: Influence the State of HTML 2025 Survey!
date: 2025-07-08
draft: true
tags: [surveys, html, data-analysis, state-of-html]
image: images/image.png
---

<figure class="no-padding">
<img src="images/image.png" alt="State of HTML 2025">
<figcaption>
Mamma mia, here we go again!
</figcaption>
</figure>

Two years ago, I was funded by Google to [design the inaugural State of HTML survey](../../2023/design-state-of-html/).
It was probably the most intense of these surveys I ever worked on.
In addition to the usual research, content, and analysis work, we even [pioneered new survey interaction UIs](../../2024/context-chips/), which improved  all subsequent _State of …_ surveys.

The [results](https://2023.stateofhtml.com/en-US/conclusion/) made it all worth it.
Turnout was the highest ever for a new Devographics [^devographics] survey: 21K participants, and is still a record high for State of HTML.
The survey findings heavily influenced [Interop 2024](https://web.dev/blog/interop-2024) and several other initiatives, such as [stylable selects](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select).

[^devographics]: [Devographics](https://devographics.com/) is the company behind "State of …" surveys.

This is the goal of these surveys: to **drive meaningful change in the web platform**.
Sure, getting a shareable score about what you know and seeing how you compare to the rest of the industry is fun, but the reason browser vendors pour thousands of dollars into funding these surveys is because they provide **unique vendor-neutral insights into developer pain points and priorities**, which helps them make better decisions about what to work on.
And this ultimately helps you: by getting your voice heard, you can directly influence the tools you work with.
**It's a win-win: developers get better tools, and browser vendors get better roadmaps.**

Last year, I was too busy to take the lead.
Wrapping up my PhD and starting a new job immediately after, there was no time to breathe, let alone lead a survey.
I’m happy to be returning to it this year, but my joy is bittersweet.
When I was first asked to lead this year’s survey a few months ago,
I was still too busy to take it on.
Someone else from the community accepted the role — someone incredibly knowledgeable and talented who would have done a **fantastic** job.
But they live in the Middle East, and as the war escalated, their safety and their family’s well-being were directly impacted.
Understandably, leading a developer survey became the least of their concerns.
In the meantime, I made a few [decisions](../construction-lines/) that opened up some availability, and I was able to step in at the last minute.
It’s a sobering reminder that events which feel far away can hit close to home — shaping not just headlines, but the work and lives of people we know.

## Web Platform Features at the verge of Interop

A big part of these surveys is "feature questions": respondents are presented with a series of web platform features,
and asked about their familiarity and sentiment towards them.
At the end, they get a score based on how many they were familiar with that they can share with others,
and browser vendors and standards groups get signal on which upcoming features to prioritize or improve.

You can see which features were included in last year’s survey [here](https://2024.stateofhtml.com/en-US/features/) or by expanding [^expanding] the table below.

[^expanding]: As an easter egg, this widget is just a `<details>` element with custom CSS.
Inspect to see how it works.
In terms of a11y, the summary gets spoken out as a regular `<summary>` element, with "Show more" or "Show less" at the end of its content.
It seems ok-ish to me, but I’d love to hear from those who have more expertise in this area.

<details class="with-preview">
<summary>State of HTML Features</summary>

| Feature | 2023 | 2024 |
|---------|------|------|
[`<datalist>`](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element)| ✅ | ✅ |
[`autocomplete` attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete)| ✅ | ✅ |
[HTML Media Capture](https://w3c.github.io/html-media-capture/#dfn-capture)| ✅ | ✅ |
[`input.showPicker()`](https://html.spec.whatwg.org/multipage/input.html#dom-input-showpicker)| ✅ | ✅ |
[FormData API](https://xhr.spec.whatwg.org/#dom-formdata)| ✅ | ✅ |
[`<selectlist>`](https://open-ui.org/components/selectmenu/)| ✅ |  |
[`contenteditable="plaintext-only"`](https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable)| ✅ | ✅ |
[`<dialog>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)| ✅ | ✅ |
[`<details>` and `<summary>`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)| ✅ | ✅ |
[Exclusive Accordion](https://github.com/whatwg/html/pull/9400)| ✅ | ✅ |
[Popover API](https://html.spec.whatwg.org/multipage/popover.html#dom-popover)| ✅ | ✅ |
[`inert` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)| ✅ | ✅ |
[Lazy loading](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes)| ✅ | ✅ |
[`srcset` and `sizes` attributes](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)| ✅ | ✅ |
[Resource Hints](https://blog.logrocket.com/understanding-css-preload-other-resource-hints/)| ✅ | ✅ |
Content-Security Policy (CSP)| ✅ | ✅ |
[`fetchpriority` attribute](https://wicg.github.io/priority-hints/)| ✅ | ✅ |
[`blocking="render"`](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#blocking-attributes)| ✅ | ✅ |
[`<model>` for AR/VR/3D content](https://immersive-web.github.io/model-element/)| ✅ | ✅ |
[`controlslist` attribute](https://wicg.github.io/controls-list/#solution-outline)| ✅ | ✅ |
[`<template>`](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)| ✅ | ✅ |
Using Custom Elements| ✅ | ✅ |
[Defining Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html#dom-customelementregistry-define-dev)| ✅ | ✅ |
[Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md)| ✅ | ✅ |
Shadow DOM| ✅ | ✅ |
[Declarative Shadow DOM](https://github.com/mfreed7/declarative-shadow-dom)| ✅ | ✅ |
Named slot assignment| ✅ | ✅ |
[Imperative slot assignment](https://html.spec.whatwg.org/multipage/scripting.html#dom-slot-assign)| ✅ | ✅ |
[`ElementInternals` API](https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface)| ✅ | ✅ |
[DOM Parts](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts.md)| ✅ | ✅ |
[HTML Modules](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md)| ✅ | ✅ |
Landmark elements| ✅ | ✅ |
[`tabindex` attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-tabindex)| ✅ | ✅ |
[`focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/)| ✅ | ✅ |
[`<search>`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element)| ✅ | ✅ |
[File System Access API](https://web.dev/file-system-access/)| ✅ | ✅ |
[Badging API](https://developer.chrome.com/articles/badging-api/)| ✅ | ✅ |
[Web Share API](https://web.dev/web-share/)| ✅ | ✅ |
[Launch Handler API](https://wicg.github.io/web-app-launch/#launch_handler-member)| ✅ | ✅ |
[File Handling API](https://web.dev/file-handling/)| ✅ | ✅ |
[Window Controls Overlay API](https://wicg.github.io/window-controls-overlay/)| ✅ | ✅ |
[Isolated Web Apps](https://github.com/WICG/isolated-web-apps)| ✅ | ✅ |
[Customizable Select](https://open-ui.org/components/customizableselect/)|  | ✅ |
`EditContext` |  | ✅ |
`caretPositionFromPoint` |  | ✅ |
Clipboard API|  | ✅ |
CSS Custom Highlight API|  | ✅ |
`setHtmlUnsafe()`|  | ✅ |
`parseHtmlUnsafe()`|  | ✅ |
`Intl.Segmenter` API |  | ✅ |

</details>

I believe that co-designing these surveys with the community is the best way to avoid blind spots.
While the timeline this year is tighter than usual, there is still a little time to ask:

<div class="nutshell">

👉🏼 Which upcoming HTML features or Web APIs are currently on your radar? 👈🏼
</div>

Why _upcoming_?
The best candidates for these surveys are features that are mature enough to be fleshed out (at least a mature proposal, ideally a spec and [WPT tests](https://web-platform-tests.org/)),
but not so mature they have already been implemented in every browser.
These are the features for which a survey such as this can drive **meaningful impact**.
If they are too early to be fleshed out, it’s hard to make progress (but they are still useful to know about as pain points).
And if they are already implemented everywhere, the only thing that can improve things further is passage of time
— which unfortunately is a problem for which I have no solution _(yet)_.

Obviously we’re looking at all the usual suspects already,
such as [webstatus.dev](https://webstatus.dev/)
or [Web platform features explorer](https://web-platform-dx.github.io/web-features-explorer).
However, even if a feature is already on our radar, since space is finite and we can’t possibly include all of them, preliminary signal is still useful!

<article class="note">

While the title is "State of HTML",
anything that wouldn’t fit better in [State of CSS](https://stateofcss.com/) or [State of JS](https://stateofjs.com/) is fair game.
This includes topics such as accessibility, browser APIs, web components, templating, static site generation, media formats, and more.
This may seem strange at first, but is no different than how the [HTML specification](https://html.spec.whatwg.org/multipage/) itself covers a lot more than just HTML markup.

</article>

You can post in the comments here,
{%- if social_posts -%}
or reply on any of the following social posts:

{%- for service, url in social_posts -%}
	{% if social[service] -%}
	<a href="{{ url }}"
		class="{{ service }}"
		title="{{ social[service].name }} post"
		style="--color: {{ social[service].color }}"
		target="_blank"><i class="fa-brands fa-{{ social[service].icon }}"></i> {{ social[service].name }}</a>
	{%- endif %}
{%- endfor -%}
{% else %}
or ping me on any of my socials.
{%- endif %}
Make sure to check the other replies first, and 👍 those with features you care about.
Looking forward to your ideas and comments!
