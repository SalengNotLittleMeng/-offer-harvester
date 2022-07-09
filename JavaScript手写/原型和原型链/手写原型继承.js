function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
    this.type = 'children';
}
console.log(Child.prototype)
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let child = new Child('children')
console.log(child)