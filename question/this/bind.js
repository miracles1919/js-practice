const { chownSync } = require('fs');

var foo = {
  val: 1,
};

function bar() {
  console.log(this.val);
}

// var bindFoo = bar.bind(foo);
// bindFoo();

Function.prototype.bind2 = function (context) {
  const self = this;
  return function () {
    return self.apply(context);
  };
};

// var bindFoo = bar.bind2(foo)
// bindFoo()

// ----------------------

// 传参
var foo = {
  val: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.val);
}

// var bindFoo = bar.bind(foo, '酱酱')
// bindFoo(2)

Function.prototype.bind2 = function (context) {
  const self = this;
  // 获取第二个及后面的参数
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // bind返回的函数传入的参数
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};

// var bindFoo = bar.bind(foo, '酱酱')
// bindFoo(2)

// ----------------------

// 构造函数

var val = 3;
var foo = {
  val: 1,
};

function bar(name, age) {
  this.type = 'cat';
  console.log(name);
  console.log(age);
  console.log(this.val);
}

bar.prototype.habits = ['sleep', 'eat'];

// var bindFoo = bar.bind(foo, '酱酱')
// var obj = new bindFoo('2') // this 会失效

// console.log(obj.type)
// console.log(obj.habits)

Function.prototype.bind2 = function (context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);

  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为true，将绑定的函数的this指向实例
    // 当作为普通函数时，this 指向window，此时结果为false，将绑定的函数的this指向context
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };

  fBound.prototype = this.prototype;
  return fBound;
};

var bindFoo = bar.bind2(foo, '酱酱');
var obj = new bindFoo('2'); // this 会失效

console.log(obj.type);
console.log(obj.habits);

// 优化
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }

  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);

  const fNOP = {};

  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };

  // 等价于 Object.create(this.prototype)
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
