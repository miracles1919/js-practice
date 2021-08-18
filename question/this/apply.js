Function.prototype.apply2 = function (context, arr) {
  context = context || window;
  context.fn = this;

  let res;

  if (!arr) {
    res = content.fn();
  } else {
    let args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push(`arr[${i}]`);
    }

    res = eval(`context.fn(${args})`);
  }

  delete context.fn;
  return res;
};



var foo = {
  val: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.val);
}

bar.apply2(foo, ['name', 'age'])