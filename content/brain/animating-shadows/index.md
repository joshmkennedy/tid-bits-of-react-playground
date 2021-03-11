---
title: Animating Shadows
date: '2021-03-11T14:51:25.542Z'
tags: ['css', 'shadows', 'animation']
---

Animation on the web can be a tricky thing. If you animate the wrong css property your UI/animation will feel choppy or janky. The safe properties to animate don't cause layout shift (causing the entire page, or large portions of the page to have to re paint or move around). Some of these properties are transform, opacity, and color (actually thats pretty much it). There are a few others, like what we are going to talk about today

Animating a box-shadow is going to give you a janky animation. However if we use the css property `filter` with the function `drop-shadow()` we can get those silky smooth shadow animations we are after.

```css
.card {
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.2));
  transition: all 0.2s cubic-bezier(0.55, 0, 0.5, 1);

  /* non animation stuff */
  width: 150px;
  height: 150px;
  border-radius: 16px;
  background: dodgerblue;
}
.card:hover {
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.2));
}
```

<style>
.card{
  filter: drop-shadow(0 0 20px rgba(0,0,0,.2));
  transition: all .2s cubic-bezier(.55,0,.5,1);

  /* non animation stuff */
  width:150px;
  height:150px;
  border-radius:16px;
  background: dodgerblue;
  margin:0 auto;
}
.card:hover{
  filter: drop-shadow(0 0 20px rgba(0,0,0,.2));
}
</style>
<div class="container">
  <div class="card" ></div> 
</div>
