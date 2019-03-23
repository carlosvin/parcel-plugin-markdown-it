const { Asset } = require('parcel-bundler');
const serializeObject = require('parcel-bundler/lib/utils/serializeObject');
const fs = require('fs');
const path = require('path');

class FolderAsset extends Asset {

    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'js';
        this.parsedPaths = [];
    }

    collectDependencies() {
        // analyze dependencies
        if (this.ast.files) {
            this.ast.files
            .map(parsedPath => path.format(parsedPath))
            .forEach(filePath => this.addURLDependency(filePath));
            this.ast.dirty = true;
        }
    }

    async parse(blogConfigString) {
        const blogConfig = JSON.parse(blogConfigString);
        const postsPath = path.relative(blogConfig.postsFolder.trim(), path.dirname(this.name));
        console.log('Finding files in dir: ', postsPath);
        const files = 
        blogConfig.files = fs
            .readdirSync(postsPath)
            .map(file => path.parse(file))
            .filter(parsedPath => parsedPath.ext === '.md');
        return blogConfig;
    }

    generate() {
        return serializeObject(
            this.ast,
            this.options.minify && !this.options.scopeHoist
        );
    }
}

module.exports = FolderAsset;
