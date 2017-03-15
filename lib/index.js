/**
 * Created by iZhui on 2017/3/14.
 */

const Path = require('path');
const fs = require('fs');
const debug = require('debug')('cds-hot');
class CdsHot {
    constructor() {
        this.caches = {};
    }

    init(baseUri, isHot) {
        this.baseUri = baseUri || Path.dirname(require.main.filename);
        this.isHot = isHot || false;
        debug('isHot?', this.isHot);
        return this;
    }

    require(path) {
        if (!this.isHot) {
            return require(Path.join(this.baseUri, path));
        }
        let array = [];
        array.push(Path.join(this.baseUri, path + '.js'));
        if (Path.extname(path)) {
            array.push(path);
        } else {
            array.push(Path.join(this.baseUri, path, './index.js'));
        }
        for (let i = 0, len = array.length; i < len; i++) {
            let item = array[i];
            if (fs.existsSync(item)) {
                let stat = fs.statSync(item);
                let time = stat.mtime.getTime();
                if (this.caches[path] !== time) {
                    debug('delete from cache', item);
                    delete require.cache[item];
                }
                this.caches[path] = time;
                debug('require module from disk', item);
                return require(item);
            }
            debug('file ', item, ' not found');
        }
    }
}

const cdsHot = new CdsHot();

module.exports = cdsHot;

module.exports.cdsRequire = (path) => {
    return cdsHot.require.bind(cdsHot)(path);
}