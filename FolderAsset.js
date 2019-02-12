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
        this.ast
            .map(parsedPath => path.format(parsedPath))
            .forEach(filePath => this.addURLDependency(filePath));
        this.ast.dirty = true;
    }

    async parse(dirPath) {
        this.dirPath = path.relative(dirPath.trim(), path.dirname(this.name));
        console.log('Finding files in dir: ', this.dirPath);
        return fs
            .readdirSync(this.dirPath)
            .map(file => path.parse(file))
            .filter(parsedPath => parsedPath.ext === '.md');
    }

    generate() {
        return serializeObject(
            this.ast,
            this.options.minify && !this.options.scopeHoist
        );
    }
}

module.exports = FolderAsset;
