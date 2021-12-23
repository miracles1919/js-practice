export class Component2 {
  static defaultAge = 18;

  constructor({ name, age }) {
    this.className = 'Component2'
    this.name = name;
    this.age = age;
  }

  getAge() {
    return this.age;
  }
}
