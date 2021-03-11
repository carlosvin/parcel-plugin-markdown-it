const { Asset } = require('parcel-bundler')
const MarkdownIt = require('markdown-it')
const Meta = require('markdown-it-meta')
const serializeObject = require('parcel-bundler/src/utils/serializeObject')

class MarkdownAsset extends Asset {
  constructor (name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
    var md = new MarkdownIt('default', {
      html: true,
      linkify: true,
      typographer: true
    }).use(Meta)
    // try loading 'markdown-it-highlightjs' if available
    try {
      md = md.use(require('markdown-it-highlightjs'), {})
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
      }
    }
    this.md = md
  }

  collectDependencies () {
    this.collectImgs(this.ast.parsed)
  }

  collectImgs (tokens) {
    for (const token of tokens) {
      if (token.type === 'inline' && token.children !== null && token.children.length > 0) {
        this.collectImgs(token.children)
      } else if (token.type === 'image') {
        const attrs = token.attrs.map((attr) => {
          const [name, value] = attr;
          if (name === 'src' && value.startsWith('.')) {
            const newSrc = this.addURLDependency(value);
            return [name, newSrc];
          }
          return attr;
        });
        token.attrs = attrs;
      }
    }
  }

  async parse (markdownString) {
    const env = {};
    const parsed = this.md.parse(markdownString, env);

    return {
      meta: this.md.meta,
      parsed,
      env
    }
  }

  generate () {
    const html = this.md.renderer.render(this.ast.parsed, this.md.options, this.ast.env);
    this.ast.html = html;

    return serializeObject(
      this.ast,
      this.options.minify && !this.options.scopeHoist
    )
  }
}

module.exports = MarkdownAsset