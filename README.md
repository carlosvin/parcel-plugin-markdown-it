This parcel plugin reads Markdown files and convert them to HTML using [markdown-it](https://github.com/markdown-it/markdown-it) package.

This HTML is stored in a variable named `html`.

Plugin also reads Markdown metadata and it stores it in a variable named `meta`.

```typescript
import { meta, html } from "./README.md";
```

[![CircleCI](https://circleci.com/gh/carlosvin/parcel-plugin-markdown-it.svg?style=svg)](https://circleci.com/gh/carlosvin/parcel-plugin-markdown-it)

# Getting started

It uses regular [Parcel plugin system](https://parceljs.org/plugins.html), so you only have to install the plugin in your project. 

If you are using [yarn](https://yarnpkg.com/):
```bash
yarn add parcel-plugin-markdown-it --dev
```

If you are using [npm](https://www.npmjs.com/):
```bash
npm install parcel-plugin-markdown-it --save-dev
```

This command just installs `parcel-plugin-markdown-it` in your `node_modules` folder and adds it to development dependency section in `package.json`:

```json
"devDependencies": {
    "parcel-plugin-markdown-it": "^0"
}
```

# Simple Example

For this example we will use a `README.md` with following content:

```markdown
---
layout: post
title: Example title
---

This is another post, you can find more at https://google.es
```

You can import a Markdown file like any regular Javascript module.

## Import

```javascript
import { meta, html } from "./README.md";

console.log('meta: ', meta);
console.log('html: ', html);
```

You will see following output in console:
```javascript
meta: 
{title: "Example title", layout: "post"}
html: 
"<p>This is another post, you can find more at <a href=\"https://google.es\">https://google.es</a></p>"
```

## Require
```javascript
const md = require("./README.md");

console.log('md: ', md);
```

You will get the following output in console:
```javascript
md: 
{
    meta: {title: "Example title", layout: "post"},
    html: "<p>This is another post, you can find more at <a href=\"https://google.es\">https://google.es</a></p>"
}
```

# Index all Markdown files in a directory
**This feature is still not working properly until https://github.com/parcel-bundler/parcel/issues/112 in ParcelJs is fixed.**

I will explain how this is currently implemented, but this feature most likely will evolve.

```javascript
const index = require("./index.blog");

for (const post of index) {
    const dir = post.dir || '.';
    const postPath = dir + '/' + post.base;
    import(postPath)
        .then(imported => console.log(imported))
        .catch(error => console.error(error));
}
```
Let's say `index.blog` file content is as follows:
```json
{
    "title": "My Blog",
    "postsFolder": "/home/my/posts",
    "author": "carlosvin@gmail.com"
}
```

Following code snippet is supposed to lazy load al the Markdown files in `/home/my/posts` and print them to console.

Expected output:
```javascript
[
    {
        html: "<p>First post found in folder</p>",
        meta: { 
            author: "author@example.com",
            title: "Post 1"  
        }
    },
    {
        html: "<p>Second post found in folder</p>",
        meta: { 
            layout: "micro",
            title: "Post 2"  
        }
    },
    ...
]
```

This feature would ease the implementation of a simple static site generator.

When this feature is properly working, I will most likely extend it to support static site generation.
