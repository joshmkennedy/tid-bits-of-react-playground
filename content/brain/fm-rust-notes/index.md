---
title: Notes On Rust From Frontend Masters Course
date: '2021-08-07T14:53:52.257Z'
tags: ['rust', 'notes', 'frontend masters']
---

These Are notes from the frontend master course on rust

## Variables

let - is mutable variable
cant even mutate objects unlike javascript

let mut varname is how you get mutable variables

can't change types even in mutable variable

## Strings

### Concat

format!(String) is how you do string interpolation.  or panic!(String), println!("{}, {}", var, var2);

## Floats: f64, f32, 

ex 2.2

## ints i8, i16, i32, i64, u8, u16, ...

No Decimal
cant divide by 0 will panic

also char - its a valid unicode u32 

## Booleans
true , false 
works with `as` if you want to go to a number

`==` no triple `===`

## Conditionals

```
if cats < 1 {
	...
}
```
the predicate has to be a boolean no automatic coercion

```rs
let varname = if x == 0 {
	expression
} else {
	expression
}; // <- need that
```
the above is an expression of course the whole snippet is a statement bc we are assigning it to varname

## Coersion

use the `as` keyword for numbers
usually goes small to big

## Functions

must type args,

typeing the return value
`-> ReturnType` 

## Tuples `let tuple: (i32,i32,i32) = (0,12,3)`

get index by dot notation tuple.1

Unit is a empty tuple `()`
functions always returns for functions that dont return a value they return a unit

tuples cant have dynamic size at runtime

## Structs `{}`

```
struct Point {
	x:i64,
	y:i64,
	z:i64,
}
let point = Point { x:5,y:6,z:2}
point.x // -> 5
```
` Point { x,...} = point`
cant change or add new fields just change the values

## Arrays `[i32;3] = [11,123,53];`

not like in js

cant change length inarrays

cant mix type unlike tuples

arrays have iterator only collection that can be iterated
```
for i in [1,2,3].iter() {

}
```

## Memory

list of bits `01010101110110110111011`

or  array of bytes (8bits) 
rust doesnt store anything about elements in memory just the value not meta data. this is how rust can be so fast

## Pattern Matching and enums

```
enum Poops {
	Green,
	Smushy,
	Runny
}
```
now you use it like
```
let my_poop = Poops::Runny
let smell = match my_poop {
	Poops::Green {...},
	Poops::Smushy {...},
	Poops::Runny {...}
}
```

## OTHER

### Macros

macros code transfomation through a series of function calls a compile time.
syntax uses ! to signal its a macro not a function

### Number type size
- i8
- f32


divide the number by 8 to get the number of bytes `32 bits is 4 bytes`
bigger number more precise but slower program

why does `x + 1` == ` return x+1;` becuase first is a expression; not a statement;
statement always ends in ;
