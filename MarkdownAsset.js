const { Asset } = require('parcel-bundler');
const MarkdownIt = require('markdown-it');
const MD = new MarkdownIt('default', {
    html: true,
    linkify: true,
    typographer: true
});

class MarkdownAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'js';
    }

    async parse(markdownString) {
        // TODO declare md a class member in constructor
        this.html = MD.render(markdownString);
        // this.html = md.parse(markdownString);
        console.log('parsed asset: ', this.html);

    }

    generate() {
        return {
            'js': `module.exports = { html: ${JSON.stringify(this.html)}}`
        };
    }
}

module.exports = MarkdownAsset;
