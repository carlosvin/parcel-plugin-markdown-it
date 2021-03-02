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

  async parse (markdownString) {
    const html = this.md.render(markdownString)
    return {
      html: html,
      meta: this.md.meta
    }
  }

  generate () {
    return serializeObject(
      this.ast,
      this.options.minify && !this.options.scopeHoist
    )
  }
}

module.exports = MarkdownAsset