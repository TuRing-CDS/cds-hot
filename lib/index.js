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

    init(baseUri) {
        this.baseUri = baseUri || Path.dirname(require.main.filename);
        return this;
    }

    require(path) {
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
                    delete require.cache[item];
                }
                this.caches[path] = time;
                return require(item);
            }
        }
    }
}

const cdsHot = new CdsHot();

module.exports = cdsHot;