var Component1 = /*#__PURE__*/function () {
  function Component1(_ref) {
    var name = _ref.name,
        age = _ref.age;
    this.className = 'Component1';
    this.name = name;
    this.age = age;
  }

  var _proto = Component1.prototype;

  _proto.getName = function getName() {
    return this.name;
  };

  return Component1;
}();

var Component2 = /*#__PURE__*/function () {
  // static getName() {}
  function Component2(_ref) {
    var name = _ref.name,
        age = _ref.age;
    this.className = 'Component2';
    this.name = name;
    this.age = age;
  }

  var _proto = Component2.prototype;

  _proto.getAge = function getAge() {
    return this.age;
  };

  return Component2;
}();
Component2.defaultAge = 18;

export { Component1, Component2 };
