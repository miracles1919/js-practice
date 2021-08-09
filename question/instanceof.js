function new_instanceof(leftValue, rightValue) {
  let rightProto = rightValue.prototype;

  // 这里为了直观表示使用__proto__, 实际使用推荐 Object.getPrototypeOf(leftValue)
  leftValue = leftValue.__proto__;

  while (true) {
    if (leftValue === null) return false;

    if (leftValue === rightProto) return true;

    leftValue = leftValue.__proto__;
  }
}
