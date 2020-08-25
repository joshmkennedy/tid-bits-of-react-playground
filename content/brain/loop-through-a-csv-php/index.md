---
title: Upload and Loop Through a CSV file in php
date: '2020-08-25T15:22:22.100Z'
tags: [php, upload files, CSV, read file]
---

### TLDR;

```php
$rows = array_map( 'str_getcsv', file( $_FILES['csv']['tmp_name'] ) );
```

When you need to import a large amount data, you might want to provide the ability to allow an upload of a csv file. Here is how you can do it.

### Starting from the Frontend side.

Im a big fan of not reloading the whole page just to submit a form, so we will use window.fetch to upload the file.

```js
const form = document.querySelector(
    'form'
);
if (!form) return;
const button = form.querySelector("button");
const idleButtonText = button.innerText;
form.addEventListener("submit", sendCSVImport);

async function sendCSVImport(e) {
  e.preventDefault();

  const form = e.target;
  button.innerText = "Loading...";

  const csv = form.querySelector("[name='csvfile']").files[0];
  const formData = new FormData();
  formData.append("csv", csv);

  const res = await fetch( URL, {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  })
  .then((res) => res.json())
  .then(res=> console.log(res);

```

Basically we are preventing the default page reload so we can use ajax. Then we are creating a new [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) object, and putting in the file from the file type input. Then we just send that right over the wire. The format of the file is binary.

### On the PHP Backend (why you are probably here)

What we basically are going to do is get the contents of the file and put each row in an array. and each row is an array of columns.

```php
$rows = array_map( 'str_getcsv', file( $_FILES['csv']['tmp_name'] ) );
```

Pretty easy right. There are a lot of things that can be done that will make this better, and more performant, like reading the file as a stream. This however will work for most files.
