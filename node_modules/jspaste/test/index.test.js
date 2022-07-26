'use strict'

// Testing CommonJS JSP
const {JSP, info} = require('../index.js');

(async () => {
    console.warn(await JSP.publish('Hello world!'))
    console.warn(info)
})();
