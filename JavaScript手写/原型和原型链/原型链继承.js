function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
    this.type = 'children';
}
Child.prototype = new Parent()

let child = new Child('children')
console.log(child)

// 原型式继承：
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
let parent = {
    name: 'parent',
    sayName: function() {
      console.log(this.name);
    }
  };
  
  var child1 = Object.create(parent)
  child.name = 'child';
  child.sayName(); // 'child'