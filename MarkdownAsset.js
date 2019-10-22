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
    try {
      md = md.use(require('markdown-it-highlight').default)
    } catch (e) {
      console.info('markdown-it-highlight not available')
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
        const attrs = new Map(token.attrs)
        const path = attrs.get('src')
        if (path.startsWith('.')) {
          this.addDependency(path)
          this.ast.dirty = true
        }
      }
      
    }
  }

  async parse (markdownString) {
    const html = this.md.render(markdownString)
    return {
      html: html,
      meta: this.md.meta,
      parsed: this.md.parse(markdownString)
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
