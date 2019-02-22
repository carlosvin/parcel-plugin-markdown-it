const { Asset } = require('parcel-bundler');
const MarkdownIt = require('markdown-it');
const Meta = require('markdown-it-meta');

class MarkdownAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'md';
        this.metadata = {};
        this.md = new MarkdownIt('default', {
            html: true,
            linkify: true,
            typographer: true
        }).use(Meta);
    }

    async parse(markdownString) {
        console.log('Parsin MD');
        this.html = this.md.render(markdownString);
        return this.html;
    }

    generate() {
        return {
            'md': {
                html: this.html,
                meta: this.md.meta
            }
        };
        /*return {
            'md': `module.exports = { 
                html: ${JSON.stringify(this.html)},
                meta: ${JSON.stringify(this.md.meta)}
            }`
        };*/
    }
}

module.exports = MarkdownAsset;
