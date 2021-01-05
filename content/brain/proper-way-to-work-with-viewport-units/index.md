---
title: Proper Way To Work With Viewport Units
date: '2021-01-05T13:50:24.179Z'
tags: [js, css, mobile]
---

To properly use vh units on the web because of safari we have to do some thing tricky due to safari's overlay ui.

first add this js

```js
// Get the viewport height and multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

and then in your css
```css
:root {
  --full-height: calc(var(--vh, 1vh) * 100);
}
```

this code came from a [css-tricks newsletter](https://css-tricks.com/newsletter/232-scroll-story/)