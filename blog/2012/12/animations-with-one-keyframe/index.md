---
title: "CSS Animations with only one keyframe"
date: "2012-12-12"
tags:
  - "tips"
  - "css"
  - "css-animations"
---

This is a very quick tip, about a pet peeve of mine in almost every CSS animation I see. As you may know, I’m a sucker for reducing the amount of code (as long as it remains human readable of course). I demonstrated a very similar example in my “CSS in the 4th dimension” talk, but I recently realized I never blogged about it (or seen anyone else do so).

Lets assume you have a simple animation of a pounding heart, like so:

```
@keyframes pound {
	from { transform: none; }
	50% { transform: scale(1.4); }
	to { transform: none; }
}

.heart {
	/* ... */
	animation: pound .5s infinite;
}
```

<iframe src="https://dabblet.com/gist/4268782/a7d1b285a6af0a0183f94079ab310217c1076275" style="width:100%; height:500px"></iframe>

You can see the problem already: the shrunk heart state is repeated twice in the keyframes (`from` and `to`). You probably know you can combine them into one rule, like so:

```
@keyframes pound {
	from, to { transform: none; }
	50% { transform: scale(1.4); }
}
```

<iframe src="https://dabblet.com/gist/4268782/b8beab24426225097410b9b159d27a5cf7e4e3fd" style="width:100%; height:500px"></iframe>

What many don’t know, is that you don’t need these two keyframes at all, since they basically replicate the same state as the one in the `.heart` rule. To quote the [CSS Animations spec](http://www.w3.org/TR/css3-animations/#keyframes):

> If a 0% or "from" keyframe is not specified, then the user agent constructs a 0% keyframe using the computed values of the properties being animated. If a 100% or "to" keyframe is not specified, then the user agent constructs a 100% keyframe using the computed values of the properties being animated.

Therefore, the code could actually be as simple as:

```
@keyframes pound {
	50% { transform: scale(1.4); }
}
```

<iframe src="https://dabblet.com/gist/4268782/b7849dbbd47761cf352fe7e0740c4bc227824f61" style="width:100%; height:500px"></iframe>

This trick is very useful for providing fallbacks that are the same as the first or last keyframe, without having to repeat them in the `@keyframes` rule. Of course it doesn’t only apply to animations where you only have one keyframe beyond `from` and/or `to`. You can omit the `from` and `to` keyframes in every animation, when you want them to be the same as the styles that are applied to the element anyway.

Of course, to make this particular animation appear more natural, it would be much more wise to do something like this, still with only one keyframe (the `from` state is dynamically generated by the browser):

```
@keyframes pound {
	to { transform: scale(1.4); }
}

.heart {
	/* ... */
	animation: pound .25s infinite alternate;
}
```

<iframe src="https://dabblet.com/gist/4268782" style="width:100%; height:500px"></iframe>

which just reverses every even iteration, instead of trying to have both states (shrinking and growing) in the animation. The reason this looks more natural is that `animation-direction: alternate;` (which is what the `alternate` keyword does in the animation shorthand) also reverses the timing (easing) function for the reversed iterations. ;)
