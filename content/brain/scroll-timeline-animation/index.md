---
title: Scroll Timeline Animation
date: '2021-05-10T13:23:08.961Z'
tags: ['css', 'no js', 'animation']
---

You can create scroll animations based on the scroll position with just css. Theres a css property called animation-timeline that works a lot like the animation property.

```css
.element-to-show {
  animation: 1s linear both show;
  animation-timeline: show-timeline;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@scroll-timeline show-timeline {
  time-range: 1s;
}
```

This feature is still really experimental as of writing this. [Can I use data](https://caniuse.com/?search=animation-timeline)
Should use the `@supports` rule to guard it.

```css
@supports (animation-timeline: works) {
  // stuff
}
```
