/**
 * Created by iZhui on 2017/3/14.
 */
const cdsHot = require('../');
cdsHot.init(__dirname, true);
const cdsRequire = cdsHot.cdsRequire

setInterval(() => {
    const hello = cdsRequire('./hello');
    console.log(hello.get());
}, 1000);