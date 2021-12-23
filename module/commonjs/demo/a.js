console.log('a entry');

function getName() {
  return 'module a';
}

module.exports = {
  getName,
};

// exports.getName = getName

// wrong example
// exports = {
//   getName
// }