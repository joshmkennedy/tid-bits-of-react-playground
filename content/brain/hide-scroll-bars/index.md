---
title: hide scroll bars
date: '2021-10-22T13:45:29.324Z'
tags: ['css']
---

When thins need to scroll but you want to hide that is scrolling you can hide the scroll bars.

## Pure CSS (_webkit support needed_)

CODE:

```CSS
::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
```

We are just hiding the visibility of theme

## JS (_more support_)

CODE

css needed

```CSS
.parent {// element needed to hide the scrollbar
  overflow: hidden;
  padding: 10px;
  //this should have a width and height that cause scrolling
}
.child { // element that will scroll
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-right: 0px;
}

```

Js needed

```javascript
const parent = document.querySelector('.container')
const child = document.querySelector('p')

const scrollbarWidth = child.offsetWidth - child.clientWidth

const newWidth = scrollbarWidth + parent.getBoundingClientRect().width

//add styles to hide the childs scroll bar behind parent
child.style.setProperty('width', `${newWidth}px`)
child.style.setProperty('padding-right', `${scrollbarWidth + 10}px`) // restore padding from the parent
```
