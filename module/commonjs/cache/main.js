require('./a');
require('./a').name = 'b';

console.log(require('./a').name);
