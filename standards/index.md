---
title: Web Standards Work
includes: '<script type=module src="/standards/time-line.js"></script>'
toc: true
---


## Proposed, now baseline

These are technologies I proposed (and sometimes specced and/or drove to implementation) that are now implemented in every browser.

### Relaxed CSS Nesting Syntax

Drove several milestones to progressively refine and simplify the syntax in a way that prioritizes user needs
by reducing boilerplate and thus inreasing efficiency, readability, and reducing error-proneness.

#### Interim syntax

This was originally known as “Lea’s proposal”, and later “Option 3”.

This was a proposal for a CSS nesting syntax that would get us halfway to North Star syntax.
It significantly reduced the use cases that had to explicitly include a nesting selector (`&`)

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1272373216)
: <time datetime="2022-10-08"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1378013329)
: <time datetime="2023-01-10"></time>

[Specced](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1293948163) (by Tab & Adam)
: <time datetime="2023-08-06"></time>

Shipped in Chrome 112
: <time datetime="2023-04-03"></time>

Shipped in Safari 16.5
: <time datetime="2023-05-17"></time>

</time-line>

Note: Firefox shipped the North Star syntax directly (see below), without shipping the interim syntax.

#### North Star syntax

This was the ideal syntax where the nesting selector (`&`) is only needed to express user intent,
and never for technical reasons.
We knew all along that this was the ideal syntax, but for many years it was considered infeasible.

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/7961)
: <time datetime="2022-10-26"></time>

[Feasibility confirmed for Chrome](https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1489883575)
: <time datetime="2023-03-30"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1514955984)
: <time datetime="2023-04-19"></time>

Shipped in Firefox 117
: <time datetime="2023-08-23"></time>

Shipped in Chrome 120
: <time datetime="2023-12-07"></time>

Shipped in Safari 17.2
: <time datetime="2023-12-10"></time>


</time-line>

### Relative Colors

Adds the capability of creating new colors by tweaking the components of existing colors in any color space,
to facilitate dynamic design systems that generate several hues and tints from a few input colors.

<time-line>

[Original proposal](https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499126198)
: <time datetime="2018-10-01"></time>

WG resolution
: <time datetime="2019-06-05"></time>

[Specced](https://github.com/w3c/csswg-drafts/commit/a7dbe90440958c46c0eae27cb1c46ebe4ce6e361) (by me)
: <time datetime="2019-12-20"></time>

Shipped in [Safari TP 127](https://webkit.org/blog/11736/release-notes-for-safari-technology-preview-127/)
: <time datetime="2021-07-01"></time>

Shipped in Safari 16.4
: <time datetime="2023-03-26"></time>

Shipped in Chrome 118 behind flag
: <time datetime="2023-10-09"></time>

Shipped in Chrome 119
: <time datetime="2023-10-30"></time>

</time-line>

### Conic gradients

Conic gradients are a type of gradient that allows for smooth color transitions around a center point.

### A pseudo-class to reduce specificity: `:where()` { #where }

`:where()` was a new pseudo-class that allows CSS authors to include querying criteria in their selectors without affecting specificity (the selector score that determines precedence).

<time-line>

[Original proposal](https://github.com/w3c/csswg-drafts/issues/1170)
: <time datetime="2017-04-04"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/1170#issuecomment-342645651)
: <time datetime="2017-11-07"></time>

[Naming resolution](https://github.com/w3c/csswg-drafts/issues/2143#issuecomment-432303830)
: <time datetime="2018-10-23"></time>

Shipped in Firefox 78
: <time datetime="2020-06-29"></time>

Shipped in Safari 14
: <time datetime="2020-09-15"></time>

Shipped in Chrome 88
: <time datetime="2021-01-18"></time>

</time-line>

### CSS Trigonomeric functions

Adds trigonometric functions to CSS, to facilitate the creation of complex shapes and animations.

<time-line>

[Original proposal](https://github.com/w3c/csswg-drafts/issues/2331)
: <time datetime="2018-02-17"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/2331#issuecomment-467990627)
: <time datetime="2019-02-27"></time>

[Specced](https://github.com/w3c/csswg-drafts/commit/b8935e7df14ed544c51a991cf10f15bf077eb603) (by Tab)
: <time datetime="2019-03-25"></time>

Shipped in Safari 15.4
: <time datetime="2022-03-13"></time>

Shipped in Firefox 108
: <time datetime="2022-12-12"></time>

Shipped in Chrome 111
: <time datetime="2023-03-06"></time>

</time-line>

### Auto-sizing form elements (now `field-sizing`)

A way to specify that form elements should be sized by their input value.
This is a big pain point for authors, as it is very commonly needed (especially for multiline text fields),
and quite tricky to implement manually.

<time-line>

[Original proposal](https://github.com/w3c/csswg-drafts/issues/7552)
: <time datetime="2022-08-01"></time>

</time-line>

### CSS-wide color interpolation handling

Defined the `in <space>` token used across CSS to specify a color space for color interpolation,
and specified defaults.

<time-line>

[Specced `in <space>` token (by me)](https://github.com/w3c/csswg-drafts/commit/3efd360d4e13227ef9b3c0466bc0296028ae5b2b)
: <time datetime="2021-11-01"></time>

[Proposal for making Oklab the default interpolation space](https://github.com/w3c/csswg-drafts/issues/7948)
: <time datetime="2022-10-24"></time>

WG resolution
: <time datetime="2023-03-22"></time>

</time-line>

### `caret-color`

`caret-color` is a property that allows authors to customize the color of the text input caret.

<time-line>

[Original proposal](https://lists.w3.org/Archives/Public/www-style/2011Nov/0772.html)
: <time datetime="2011-11-29"></time>

[WG resolution](https://lists.w3.org/Archives/Public/www-style/2014Oct/0260.html)
: <time datetime="2014-09-08"></time>

Shipped in Chrome 57
: <time datetime="2017-03-08"></time>

Shipped in Firefox 53
: <time datetime="2017-04-18"></time>

Shipped in Safari 11.1
: <time datetime="2018-03-28"></time>

</time-line>

### Relaxed `box-shadow` syntax

Perhaps my first CSS proposal.
Relaxed the syntax of `box-shadow` to minimize author errors.
Gave birth to one of CSS’s design principles, dubbed ["Lea Verou reordering principle"](https://wiki.csswg.org/ideas/principles?s[]=reordering).

<time-line>

[Proposal](https://lists.w3.org/Archives/Public/www-style/2012Oct/0313.html)
: <time datetime="2012-10-12"></time>

</time-line>

## Accepted, specced, but not yet shipped

### `contrast-color()` MVP

Automatically generating contrasting colors is a big author pain point, but discussusions around fleshing out a full `contrast-color()` function were taking too long.
I proposed an MVP that would cover the most common use cases, and got it accepted.
While I did not initially propose `contrast-color()`, I drove aggressively reducing scope to facilitate shipping an MVP that would cover >80% of use cases.

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/9166)
: <time datetime="2023-08-06"></time>

[Tab & Nicole’s tweak](https://github.com/w3c/csswg-drafts/issues/9166#issuecomment-1708978105)
: <time datetime="2023-09-06"></time>

[Specced](https://github.com/w3c/csswg-drafts/commit/39f469149abb5575505b6d2d54b8bddf119f896d) (by me)
: <time datetime="2024-02-16"></time>

</time-line>

### Simplified `:local-link`

This addresses the common author pain point of styling links to the current page (e.g. in a navigation menu)
in a different way.
It built on an existing proposal that had been removed,
but simplified it to cover the most common use cases without the complexity of the previous proposal.

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/2010)
: <time datetime="2017-11-24"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/2010#issuecomment-355167067)
: <time datetime="2018-01-03"></time>

[Specced](https://github.com/w3c/csswg-drafts/commit/e3093cf48c8fd26f90c4def71d587bfeff780243) (by Elika)
: <time datetime="2018-01-05"></time>

</time-line>

### `stripes()`

This is a reusable primitive that was designed to allow borders of multiple colors,
something that was requested by accessiblity groups.

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/2532)
: <time datetime="2018-04-11"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/2532#issuecomment-402327492)
: <time datetime="2018-07-03"></time>

Specced (by Sebastian)
: <time datetime="2023-07-27"></time>

</time-line>

## Accepted but not yet specced

### `::tooltip`

Styling tooltips in a custom way is a huge author pain point.
Since browser-generated tooltips cannot be styled, authors end up having to recreate the tooltip functionality entirely from scratch,
with significantly worse DX and accessibility.
This proposal would allow browser-generated tooltips to be styled in a limited way.

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/8930)
: <time datetime="2023-08-06"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/8930#issuecomment-1644333441)
: <time datetime="2023-07-20"></time>

</time-line>

### `inherit()`

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/2864)
: <time datetime="2018-07-02"></time>

[WG resolution](https://lists.w3.org/Archives/Public/www-style/2021May/0012.html)
: <time datetime="2021-04-08"></time>

[Second WG resolution (naming & scope reduction)](https://github.com/w3c/csswg-drafts/issues/2864#issuecomment-1645794662)
: <time datetime="2023-07-21"></time>

</time-line>

### `@image`

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/6807)
: <time datetime="2021-08-06"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/6807#issuecomment-1248380039)
: <time datetime="2022-09-15"></time>

</time-line>

### `color-extract()`

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/6937)
: <time datetime="2022-01-09"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/6937#issuecomment-1011307383)
: <time datetime="2022-01-12"></time>

</time-line>

### Conditionless CQs

<time-line>

[Proposal](https://github.com/w3c/csswg-drafts/issues/9192)
: <time datetime="2023-08-15"></time>

[WG resolution](https://github.com/w3c/csswg-drafts/issues/9192#issuecomment-1789850349)
: <time datetime="2023-11-01"></time>

</time-line>

