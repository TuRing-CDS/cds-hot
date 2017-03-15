/**
 * Created by iZhui on 2017/3/14.
 */
const cdsHot = require('../');
const cdsRequire = cdsHot.init(__dirname, true).require.bind(cdsHot);

setInterval(() => {
    const hello = cdsRequire('./hello');
    console.log(hello.get());
}, 1000);