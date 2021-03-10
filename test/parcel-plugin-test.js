// const assertBundleTree = require('parcel-assert-bundle-tree');
const path = require('path')
const MdPlugin = require('../index')
const Bundler = require('parcel-bundler')

const assertBundleTree = require('parcel-assert-bundle-tree')

async function setupBundler (input, output) {
  const bundler = new Bundler(input, Object.assign({
    outDir: path.join(__dirname, output),
    watch: false,
    cache: false,
    hmr: false,
    logLevel: 0,
    publicUrl: './'
  }))
  await MdPlugin(bundler)
  return bundler
}

describe('basic', function () {
  it('Should create a basic MD bundles', async function () {
    const inputFile = path.join(__dirname, './data/index.js')
    console.log('Test input file: ', inputFile)
    const bundler = await setupBundler(inputFile, 'dist/basic')

    // Bundle the code
    const bundle = await bundler.bundle()
    // Compare bundle to expected
    assertBundleTree(bundle, {
      name: 'index.js',
      assets: ['index.js', 'a-test-file.md', 'b-test-file.md', 'icon48.png'],
      childBundles: [{ type: 'png' }, { type: 'map' }]
    })
  })

  it('Should create a basic MD bundles from folder', async function () {
    const inputFile = path.join(__dirname, './data/index-folder.html')
    console.log('Test input file: ', inputFile)
    const bundler = await setupBundler(inputFile, 'dist/folder')

    // Bundle the code
    const bundle = await bundler.bundle()
    // Compare bundle to expected
    assertBundleTree(bundle, {
      name: 'index-folder.html',
      assets: ['index-folder.html'],
      childBundles: [
        {
          type: 'js',
          assets: ['index.blog'],
          childBundles: [
            {
              type: 'js',
              assets: ['a-test-file.md']
            },
            {
              type: 'js',
              assets: ['b-test-file.md', 'icon48.png']
            },
            {
              type: 'map',
              assets: ['index.blog']
            }
          ]
        }
      ]
    })
  })
})
