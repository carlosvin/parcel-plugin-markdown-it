const { Asset } = require('parcel-bundler');
const MarkdownIt = require('markdown-it');
const Meta = require('markdown-it-meta');

class MarkdownAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'js';
        this.metadata = {};
        this.md = new MarkdownIt('default', {
            html: true,
            linkify: true,
            typographer: true
        }).use(Meta);
    }

    async parse(markdownString) {
        this.html = this.md.render(markdownString);
        return this.html;
    }

    generate() {
        return {
            'js': `module.exports = { 
                html: ${JSON.stringify(this.html)},
                meta: ${JSON.stringify(this.md.meta)}
            }`
        };
    }
}

module.exports = MarkdownAsset;
