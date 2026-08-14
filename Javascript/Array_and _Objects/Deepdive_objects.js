// 5




//this Keyword

//this keyword:- this refers to the object that is currently executing the code. Its value is not static; it is determined entirely by how a function is called, not where it is defined.

//  Global Context: Outside any function, this refers to the global object (window in browsers, global in Node.js).
// Object Method: When a function is called as an object method, this points to the object containing the method.
// Strict Mode: Inside a regular function in strict mode ("use strict"), this evaluates to undefined instead of the global object.
// Arrow Functions: Arrow functions do not possess their own this binding. Instead, they inherit this lexically from their enclosing outer scope.

//call(), apply(), bind() methods:- These methods are used to explicitly set the value of this when calling a function. They allow you to control the context in which a function is executed, enabling you to borrow methods from other objects or set a specific object as the context for a function call.

// call(): Invokes a function with a specified this value and individual arguments. It takes the first argument as the value of this and the subsequent arguments as the function's parameters.

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person1 = { name: "Alice" };
console.log(greet.call(person1, "Hello", "!")); // Output: "Hello, Alice!"

//apply(): Similar to call(), but it takes an array of arguments instead of individual arguments. It allows you to pass an array of values as the function's parameters.
console.log(greet.apply(person1, ["Hi", "."])); // Output: "Hi, Alice."

//bind(): Returns a new function with a specified this value and optional initial arguments. It does not invoke the function immediately but creates a new function that can be called later.
const boundGreet = greet.bind(person1, "Hey");
console.log(boundGreet("!")); // Output: "Hey, Alice!"

// Constructor Functions and the new Keyword:- Constructor functions are special functions used to create and initialize objects. They are typically named with an uppercase first letter to distinguish them from regular functions. When called with the new keyword, a constructor function creates a new object, sets its prototype to the constructor's prototype, and binds this to the new object.

//The new Keyword Mechanics
// Constructor functions must be invoked using the new operator. When you type new User(), JavaScript automatically executes four actions behind the scenes:
// Creates a brand-new, empty plain JavaScript object.
// Links (binds) the this keyword of the function to point directly to this newly created object.
// Points the new object's internal prototype (__proto__) to the constructor function's prototype object.
// Returns the newly created object automatically (unless the function explicitly returns a different non-primitive object)

function Person(name, age) {
  // "this" points to the new object being created
  this.name = name;
  this.age = age;

  // Method inside the constructor (creates a new instance per object)
  this.logIn = function () {
    return `${this.name} logged in.`;
  };
}

const person2 = new Person("Bob", 25);

console.log(person2.name);
console.log(person2.logIn()); // Output: "Bob logged in."

//Optmization using prototype:- Instead of defining methods inside the constructor, you can define them on the constructor's prototype. This way, all instances share the same method, saving memory and improving performance.
Person.prototype.logOut = function(){
    return `${this.name} logged out.`;
}
console.log(person2.logOut()); // Output: "Bob logged out."
