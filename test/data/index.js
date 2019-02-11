
const MdTestA = require('./a-test-file.md');

function initComponentA() {
    const mdTest = new MdTestA();
    return mdTest;
}

function initComponentB() {
    const MdTestB = require('./b-test-file.md');
    const mdTest = new MdTestB();
    return mdTest;
}

initComponentA();
initComponentB();
