const { Asset } = require('parcel-bundler');
const MarkdownIt = require('markdown-it');
const Meta = require('markdown-it-meta');

class MarkdownAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'js';
        this.md = new MarkdownIt('default', {
            html: true,
            linkify: true,
            typographer: true
        }).use(Meta);
    }

    async parse(markdownString) {
        const html = this.md.render(markdownString);
        return {
            html: html,
            meta: this.md.meta
        };
    }

    generate() {
        return {
            'js': `module.exports = { 
                html: ${JSON.stringify(this.ast.html)},
                meta: ${JSON.stringify(this.ast.meta)}
            }`
        };
    }
}

module.exports = MarkdownAsset;
