// 3



//Objects:- An object is a standalone entity containing a collection of properties. A property is an association between a key (or name) and a value.

//Creation methods of objects
// object literal, object constructor, object.create(), class, function constructor
// object literal(most common)
const user = {
  name: "Jhon Doe",
  age: 30,
};

// constructor function
function User(name, age) {
  this.name = name;
  this.age = age;
}

const Person = new User("Jhon Doe", 30);

// Object.create(): Uses an existing object as the prototype of a newly created object


// Accessing Properties
// Dot Notation: user.name 
// Bracket Notation: user["name"] (Mandatory when property names are dynamic, contain spaces, or use symbols)


//Key Methods & Operations
// Object.keys(obj): Returns an array of an object's enumerable property names or keys names.
// Object.values(obj): Returns an array of an object's enumerable property values or all values array.
// Object.entries(obj): Returns an array of an object's own enumerable string-keyed property [key, value] pairs.
// Object.assign(target, source): Copies properties from source objects to a target object.
// hasOwnProperty(prop): Returns a boolean indicating whether the object has the specified property as its own property (not inherited). pass it like user.hasOwnProperty("name"); //true


//Object Immutability
// Object.preventExtensions(obj): Prevents new properties from being added.
// Object.seal(obj): Prevents adding/removing properties. Existing properties can still be modified.
// Object.freeze(obj): Prevents any changes at all (properties cannot be added, removed, or modified). Deep objects are not frozen automatically