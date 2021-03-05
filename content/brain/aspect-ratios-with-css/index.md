---
title: Aspect Ratios With CSS
date: '2021-03-05T14:09:39.534Z'
tags: ['css', 'aspect-ratio', 'iframes']
---

Sizing iframes with that have videos has always been something that is difficult. In the past you might have brought in some library like Dave Rupert's jQuery plugin fitvids. However there is a new css property coming to browsers or is already implemented called `aspect-ratio` this allows you to set the ratio in the css and the element will always retain that width and height ratio.

```css
iframe{
  width:100%;
  aspect-ratio:16/9 /*the ratio for most videos*/
}
```
and your done easy as that.

However this is a really new property and may not be able to be used in production just yet without fallbacks. So if you need a fallback, and you just want a css solution than this is the css that fitvid's inserts on to the page that you can just put in your stylesheet and you may not need the library.

```css
iframe {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc((9 / 16) * 100%); /*ratio for most videos*/
}
```

