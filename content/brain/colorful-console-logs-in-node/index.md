---
title: Writing Colorful console logs in node
date: '2021-06-18T12:05:21.263Z'
tags: ['js', 'console', 'debugging', 'node', 'ASCII']
---

Getting stylish in console logs in the browser is easy and fun because you can just use css. See this [brain dump](/brain/fancy-console-logs/) for how to do stylish console.logs in the browser. How ever in node we arent outputting to a browser that can understand css, but a text based stdout terminal emulator. We have to use 'ANSI escape sequences'. Here is an example of what that lookis like.

```js
console.log(
  //styles
  '\x1b[32m%s \x1b[0m',
  //text
  'I am green'
)
```

#### Outputs

![example of outputting green text](iamgreenexample.png)

This is very gross and not readable, but here is whats going on. The first part `\x1b` is the escape sequence, telling the emulator your about to change the color (more or less to be honest im not exactly sure). The next part you declare the color `[32`. That apparently is green. Then the letter `m`, which means we are done declaring our color. Here is a [wikipedia article](https://en.wikipedia.org/wiki/ANSI_escape_code) that shows a full list of the codes. The next pare is `%s`, this is just putting a place holder for our text to go. The last part is `\x1b[0m`. We see we are declaring another escape sequence, and then its another color `[0m`. This is a reset. We are resetting the color back to the default.

What about background colors? We can also set a background color. Here is what that looks like.

```js
console.log(
  //styles
  '\x1b[32m\x1b[41m %s \x1b[0m',
  //text
  'I am green with red background'
)
```

#### Outputs

![example of outputting green text with a red background](greentextredbackground.png)

Everything is the same except we added an additional color before our text placeholder. The [Wikipedia article](https://en.wikipedia.org/wiki/ANSI_escape_code) also has a list of available background colors you can use.

Memorizing those strange color codes is not ideal. Some terminal emulators can support RGB. This to me makes the most sense. It has a slightly different syntax. It looks like this.

```js
console.log(
  //styles
  '\x1b[38;2;255;0;0m%s \x1b[0m',
  //text
  'I am red text'
)
```

#### Outputs

![example of outputting red text with rgb color code](redtext.png)

Lets break this syntax down. We start off with our familiar escape sequence `\x1b`. Now we are about to declare our color. `[38;2;`, means we are about to declare and RGB foreground (text) color. Next we declare our RGB values separated, by semicolons `255;0;0`. Then we finish our color sequence with the letter `m` just like before. If we wanted to do rgb with background color we use `48;2` instead of `[38;2;`.

```js
console.log(
  //styles
  '\x1b[48;2;255;0;0m%s \x1b[0m',
  //text
  'I have a red background'
)
```

#### Outputs

![example of outputting red background with rgb color code](redbackground.png)

There are other things you can do to style your text like make it bold, brighter or dimmer. If you are interested in more digging in to this [Wikipedia article](https://en.wikipedia.org/wiki/ANSI_escape_code) is a good place to start.
