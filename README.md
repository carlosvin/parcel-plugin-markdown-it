This parcel plugin reads Markdown files and convert them to HTML using markdown-it package.

This HTML is stored in a variable named `html`.

Plugin also reads Markdown metadata and it stores it in a variable named `meta`.

```typescript
import { meta, html } from "./README.md";
```

# Getting started

It uses regular Parcel plugin system, so you only have to install the plugin in your project. 

```bash
yarn add parcel-plugin-markdown-it -D
```

If you are using npm:
```bash
npm install parcel-plugin-markdown-it --save
```

This command just installs parcel-plugin-markdown-it in your node_modules folder and adds the development dependency to `package.json`. 

# Simple Example

For this example we will use a README.md with following content:

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
**This feature is still not working properly until a bug in parcel plugin is fixed.**

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
Let's say `index.blog` file content is `/home/my/posts`.

This code snippet is supposed to lazy load al the Markdown files in `/home/my/posts` and print them to console.

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
