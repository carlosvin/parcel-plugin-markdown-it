
const MdTest = require('./a-test-file.md');

function initComponent() {
    console.log(MdTest);
    return new MdTest();
}

initComponent();
