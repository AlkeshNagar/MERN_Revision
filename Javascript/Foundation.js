// 1

// POINT 1
// Before start, Not everything in JavaScript is an object, javascript is divided in two distinct categories:
// 1. Primitives:- number, string, boolean, null, undefined, symbol(bigint) --->these are stored in stack memory and accessed by value.
// 2. Non-primitives:- object, array, function  ------> this are also reference types as they are stored in heap memory and accessed by reference.
// Javascript uses the mechanism called autoboxing (or object wrapping), which makes primitives behave like objects when you try to access methods or properties on them.
//The Illusion: Why It Feels Like "Everything is an Object"
// If strings are primitives and don't have methods, why does "hello".toUpperCase() work?
// When we call a property or method on a primitive (like String, Number, or Boolean), JavaScript silently executes a process called autoboxing:
// JavaScript creates a temporary wrapper object around the primitive (e.g., new String("hello")).
// It runs the requested method (toUpperCase()) from that object's prototype.
// It returns the result and immediately destroys the temporary object.






// POINT 2
// typeof null returns object, but it is actually a primitive type. confusion arises from the the historical bug as original implementation of js is stored in 32 bits binary values(0 and 1). and small type tag (the lowest 1 to 3 bits)used by the engine to identify the data type
//000 meant the data was a reference to an object.
// 1 meant the data was an integer.
// 010 meant the data was a double floating-point number.
// 100 meant the data was a string. 
// Because null represents a completely empty reference (or a null pointer), its value was represented as all zeroes in binary (0x00)
// When the typeof operator read the binary representation of null, it looked at the lowest 3 bits. Since those bits were 000, the engine mistakenly assumed it was looking at an object and returned "object".














// Start with printing an output in console
console.log("hello world"); //this will print normal "hello world" in console
console.error("this is error"); // this will show error message in console with red color
console.warn("this is warning"); // this will show warning message in console in yellow color
// console.prompt("enter your input"); // this will take input from user and print in console
// console.alert("this is alert"); // this willshow alert message in browser
// window.confirm("take confirmation"); // this will take confirmation froom user and print in console

// Variable scopes (var, let, const)

// var:- global scope(function scope) can be accessed anyware in the code. hoisted with undefined and can be reinitialized and redeclared. get undefined if we try to access it before initialization.

var num;

console.log("this is num", num);

num = 10;

// temporal dead zone:- if we try to access variable before initialization it will give reference error. ler and const are block scopped and cannot be accessed outside the block. let can be reinitialized but not redeclared. const cannot be reinitialized or redeclared.
//let variable:- block scope, reinitialised but not redeclared, temperal dead zone
let num1;
console.log("this is num1 with let variable", num1); //this will give reference error as we are trying to access variable before initialization. it's in temporal dead zone.

const num2;
console.log("this is num2 with const variable", num2); ////this will give reference error as we are trying to access variable before initialization. it's in temporal dead zone.
num2 = 20; //this will give syntax error as const variable cannot be reinitialized.

// understand the execution order of code in javascript
// micro tasks(collects callbacks coming from Promises (.then(), .catch(), async/await) and DOM Mutation Observers.) have higher priority than macro task(handles user inputs, clicks, and DOM manipulation callbacks).

// data types
// primitives:- number, string, boolean, null, undefined, symbol(bigint) --->these are stored in stack memory and accessed by value.
// non-primitives:- object, array, function  ------> this are also reference types as they are stored in heap memory and accessed by reference.

// Type Conversion & Type Coercion
// conversion(intentionally converting one datatype to another by developer) and coercion(automatically converting one datatype to another by javascript engine).

// operators
// arithmetic(+,-,*,/,%,++,--), assignment(=,+=,-=etc), comparison(==,===,!=,etc), logical(&&,||,!)bitwise(&,|, etc)












// loops
//  4. Loop Control Statements
// break: Immediately terminates the loop execution and jumps to the next line of code outside the loop.
// continue: Skips the current iteration and jumps directly to the loop condition evaluation or next increment phase

// For loop
for (let i = 0; i < 3; i++) {
  console.log(i);
} // Outputs 0, 1, 2

//while loop
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
} //outputs 0, 1, 2

//Do while loop
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 0); // Outputs 0













// Functions
// Function declaration
function greet(name) {
  return "Hello " + name;
}

// function expression
const greet = function (name) {
  return "Hello " + name;
};

// arrow function
const greet = (name) => "Hello " + name; // Implicit return if single statement

// parameters and arguments
function add(a, b) {  //parameters are a and b
  return a + b;
}

add(2, 3); //5; //arguments are 2 and 3



//callback functions
function fetchData(callback) {
  // Simulating an API request with a 1000ms delay
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data); // Invoking the callback with data
  }, 1000); // 💡 Added delay time here
}

// ➡️ How you invoke it:
function displayData(user) {
  console.log(`Name: ${user.name}, Age: ${user.age}`);
}

fetchData(displayData); // Outputs after 1 second: Name: John, Age: 30






// execution context:- execution context is the environment in which the code is executed. it has two phases:-
// creation phase:- in this phase the memory is allocated for variables and functions.
// execution phase:- in this phase the code is executed line by line and the values are assigned to variables and functions are executed.


console.log("Start"); //this will print first

setTimeout(() => {
  console.log("Timeout Callback (Macro)"); //this will print last as settieput is macro task and will be executed after microtasks are completed.
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Callback (Micro)"); //this will print second as promise is micro task and havehigher priority that macre task.
});

console.log("End"); // this willprint third as it is normal code and will be executed after first line of code.










// Shallow copy:- Copies only the top-level properties. Nested objects or arrays share the same memory reference. Mutating nested objects in the copy affects the original object. Faster; uses minimal memory.


const original = { name: "Alice", details: { age: 25 } };
const shallowCopy = { ...original };

// Mutating top-level doesn't affect original
shallowCopy.name = "Bob"; 
console.log(original.name); // "Alice"

// Mutating nested level DOES affect original
shallowCopy.details.age = 30; 
console.log(original.details.age); // 30 (Shared reference!)



// Deep copy:- Copies all levels recursively. The new duplicate is completely independent. Mutating nested objects in the copy does not affect the original. Slower; creates entirely new memory allocations.

const original = { name: "Alice", details: { age: 25 } };

// Best Practice: Modern native method
const deepCopy = structuredClone(original); 

deepCopy.details.age = 40;
console.log(original.details.age); // 25 (Completely isolated!)
