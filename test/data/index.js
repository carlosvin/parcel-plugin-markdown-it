
import { html, meta } from './a-test-file.md';

function initComponentA() {
    console.log(html, meta);
}

export function initComponentB() {
    return require('./b-test-file.md');
}

initComponentA();
initComponentB();
