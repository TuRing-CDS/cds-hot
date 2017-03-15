## TuRing-CDS

### cds-hot

### How to use

    npm install cds-hot --save
    
### Example

    'use strict'
    const Hot = require('cds-hot');
    // true 启用热更新，文件发生变化，会重载JS文件
    // 否则 不启用
    const isHot = true;
    Hot.init(__dirname,isHot);
    const cdsRequire = Hot.cddRequire;
    
    setInterval(()=>{
        let demo = cdsRequire('./demo');
        console.log(demo);
    },1000);