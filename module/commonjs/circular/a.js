console.log('a entry');
exports.x = 'a1';
console.log('a.js, ', require('./b').x);
exports.x = 'a2';
