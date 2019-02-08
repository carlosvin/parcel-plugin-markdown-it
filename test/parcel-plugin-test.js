//const assertBundleTree = require('parcel-assert-bundle-tree');
const path = require('path');
const MdPlugin = require('../index');
const Bundler = require('parcel-bundler');

const assertBundleTree = require('parcel-assert-bundle-tree');

async function setupBundler(input, options) {
    const bundler = new Bundler(input, Object.assign({
        outDir: path.join(__dirname, 'dist'),
        watch: false,
        cache: false,
        hmr: false,
        logLevel: 0,
        publicUrl: './'
    }, options));
    await MdPlugin(bundler);
    return bundler;
}

describe('basic', function () {
    it('Should create a basic MD bundle', async function () {
        const inputFile = path.join(__dirname, './data/index.js');
        console.log(inputFile);
        const bundler = await setupBundler(inputFile);

        // Bundle the code
        const bundle = await bundler.bundle();
        console.log(bundle);
        // Compare bundle to expected
        /*assertBundleTree(bundle, {
            name: 'index.html',
            assets: ['index.html'],
            childBundles: [
                {
                    type: 'js',
                    assets: ['index.js', 'Demo.svelte', 'Header.svelte'],
                    childBundles: [
                        {
                            type: 'map'
                        }
                    ]
                }
            ]
        });*/
    });
});