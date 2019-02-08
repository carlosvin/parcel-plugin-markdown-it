const { Asset } = require('parcel-bundler');

class MarkdownAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'js';
    }

    async parse(markdownString) {
        // TODO declare md a class member in constructor
        var MarkdownIt = require('markdown-it'), md = new MarkdownIt();
        this.html = md.render(markdownString);
        console.log(this.html);

    }

    generate() {
        return {
            'js': `module.exports = ${JSON.stringify(this.html)}`
        };
    }
}

module.exports = MarkdownAsset;
