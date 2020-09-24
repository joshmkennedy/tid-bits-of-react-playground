---
title: Zustand + Immerjs creates a great state management library
date: '2020-09-24T14:30:29.510Z'
tags: [react, state-management]
---

[Zustand](https://github.com/pmndrs/zustand) is a state management library (primarily used for react, although you can use it with vanilla js) that makes it really simple to have a global store. You don't have to wrap your app in a context, and it is really flexible.

```js
import create from 'zustand'

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```

## Making immutable code easy with immerjs

[Immerjs](https://immerjs.github.io/immer/docs/introduction) allows you to work in a immutable way but use mutable patterns.

```js
const a = [1, 2, 3]
a.push(4)
```

This is a mutable pattern. We are mutating the variable a. In React, and in general this is not a great practice, but this code is very simple and readable. Immerjs allows us to use to write simple code while maintaining the safety of immutable code.

```js
import produce from 'immer'

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
]

const nextState = produce(baseState, draftState => {
  draftState.push({ todo: 'Tweet about it' })
  draftState[1].done = true
})
```

## Zustand + Immerjs for easy state management in react

Combining these two libraries makes for a really easy and great State Management experience in react

```js
import create from 'zustand'
import produce from 'immer'

const useStore = create(set => ({
  lush: { forrest: { contains: { a: 'bear' } } },
  set: fn => set(produce(fn)),
}))

const set = useStore(state => state.set)
set(state => {
  state.lush.forrest.contains = null
})
```
