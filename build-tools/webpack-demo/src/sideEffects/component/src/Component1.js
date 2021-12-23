export class Component1 {
  constructor ({ name, age }) {
    this.className = 'Component1'
    this.name = name
    this.age = age
  }
  getName () {
    return this.name
  }
}