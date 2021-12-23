require('./a');
require('./b');

console.log('main entry');
console.log('main.js, ', require('./a').x);
