module.exports = function (bundler) {
  bundler.addAssetType('.md', require.resolve('./MarkdownAsset.js'))
  bundler.addAssetType('.blog', require.resolve('./FolderAsset.js'))
}
