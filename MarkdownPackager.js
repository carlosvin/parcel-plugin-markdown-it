const { Packager } = require('parcel-bundler')

class MarkdownPackager extends Packager {
    async start() {
        // optional. write file header if needed.
        await this.dest.write('export const MD_INDEX = {};');
    }

    async addAsset(asset) {
        console.log(asset);
        // required. write the asset to the output file.
        await this.dest.write(`MD_INDEX[${asset.id}] = { 
            html: ${asset.generated.md.html}, 
            meta: ${JSON.stringify(asset.generated.md.meta)} };`);
    }

    async end() {
        // optional. write file trailer if needed.
    }
}

module.exports = MarkdownPackager
