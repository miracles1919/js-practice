var foo = {
  val: 1,
};

function bar() {
  console.log(this.val);
}

bar.call(foo)

/**
 * 思路:
 * foo = {
 *  val: 1,
 *  bar(){}
 * }
 *
 * foo.bar()
 */
Function.prototype.call2 = function (context) {
  context.fn = this;
  context.fn();
  delete context.fn;
};

bar.call2(foo)

// ----------------------

var foo = {
  val: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.val);
}

bar.call(foo, '酱酱', 2)

/**
 * 思路:
 * 从arguments中取第二个至最后一个参数，放入数组中
 *
 * foo.bar()
 */
Function.prototype.call2 = function (context) {
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }

  eval(`context.fn(${args})`);
  delete context.fn;
};

bar.call2(foo, '酱酱', 2)

// ----------------------

var val = 1;

function bar() {
  console.log(this.val);
}

bar.call(null);

var foo = {
  val: 1,
};

function bar(name, age) {
  return {
    val: this.val,
    name: name,
    age: age,
  };
}

console.log(bar.call(foo, '酱酱', 2));


Function.prototype.call2 = function (context) {

  context = context || window
  context.fn = this;

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }

  const res = eval(`context.fn(${args})`);
  delete context.fn;
  return res
};

console.log(bar.call2(foo, '酱酱', 2));