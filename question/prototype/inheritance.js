/**
 * 原型链继承
 */
function Animal(name) {
  this.type = 'animal';
  this.name = name;
  this.habits = ['sleep', 'eat'];
}

Animal.prototype.play = function () {
  console.log(this.type + ' ' + this.name + ' is playing');
};

function Cat(name) {
  this.type = 'cat';
  this.name = name;
}

// 继承
Cat.prototype = new Animal();
Cat.prototype.eat = function () {
  console.log(this.name + ' eat canned fish');
};

let animal = new Animal('aa');
animal.play();

let cat = new Cat('酱酱');
cat.play();
cat.eat();

let cat2 = new Cat('cc');
cat.habits.push('play with little mice');

console.log(cat.habits);
console.log(cat2.habits);

// ===========================

/**
 * 盗用构造函数
 */

function Animal(name) {
  this.type = 'animal';
  this.name = name;
  this.habits = ['sleep', 'eat'];
}

Animal.prototype.play = function () {
  console.log(this.type + ' ' + this.name + ' is playing');
};

function Cat(name) {
  // 继承属性
  Animal.call(this, name);
}

let cat3 = new Cat('酱酱3');
let cat4 = new Cat('酱酱4');

cat3.habits.push('play with little mice');

console.log(cat3.play);
console.log(cat3.habits);
console.log(cat4.habits);

// ===========================

/**
 * 组合继承
 */

function Animal(name) {
  this.type = 'animal';
  this.name = name;
  this.habits = ['sleep', 'eat'];
}

Animal.prototype.play = function () {
  console.log(this.type + ' ' + this.name + ' is playing');
};

function Cat(name) {
  // 继承属性
  Animal.call(this, name);
}

// 继承方法
Cat.prototype = new Animal();
Cat.prototype.eat = function () {
  console.log(this.name + ' eat canned fish');
};

let cat5 = new Cat('酱酱5');
let cat6 = new Cat('酱酱6');

cat5.habits.push('play with little mice');

cat5.play();
cat5.eat();
console.log(cat5.habits);
console.log(cat6.habits);

// ===========================

/**
 * 原型式继承
 */

function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

const animalObj = {
  type: 'animal',
  habits: ['sleep', 'eat'],
};

let cat7 = createObj(animalObj);
let cat8 = createObj(animalObj);

cat7.habits.push('play with little mice');
console.log(cat7.habits);
console.log(cat8.habits);

// ===========================

/**
 * 寄生式继承
 */

function createCat(o) {
  // 通过调用函数创建一个新对象
  let clone = createObj(o);
  // 以某种方式增强这个对象
  clone.eat = function () {
    console.log(this.name + ' eat canned fish');
  };
  return clone;
}

let cat9 = createObj(animalObj);

// ===========================

/**
 * 寄生组合式继承
 */

function inheritPrototype(Child, Parent) {
  // 创建对象
  let prototype = Object.create(Parent.prototype)
  // 增强对象
  prototype.constructor = Child
  // 赋值对象
  Child.prototype = prototype
}


function Animal(name) {
  this.type = 'animal';
  this.name = name;
  this.habits = ['sleep', 'eat'];
}

Animal.prototype.play = function () {
  console.log(this.type + ' ' + this.name + ' is playing');
};

function Cat(name) {
  Animal.call(this, name)
  this.type = 'cat'
}

inheritPrototype(Cat, Animal)

let cat9 = new Cat('酱酱9')
let cat10 = new Cat('酱酱10')

cat9.play()
cat10.habits.push('play with little mice');
console.log(cat9.habits)
console.log(cat10.habits)
