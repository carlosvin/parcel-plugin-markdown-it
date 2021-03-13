import { meta, html } from "../test/data/b-test-file.md";

console.log('meta: ', meta);
console.log('html: ', html);

document.body.innerHTML = html;
