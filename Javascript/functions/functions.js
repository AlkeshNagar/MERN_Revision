// 7
// Closures:-a feature in JavaScript where an inner function retains access to the variables and scope of its outer function, even after the outer function has finished executing.

// Mechanics & Scope Chain
//Every time a function is created in JavaScript, a closure is automatically generated. The inner function preserves a reference to three distinct scopes:
// Its own scope (variables defined inside its curly braces).
// The outer function's scope (variables and parameters of the parent function).
// The global scope.

function createCounter() {
  let count = 0; // 💡 Private variable inside the outer function scope

  return function () {
    count++; // Accesses and modifies the outer variable
    return count;
  };
}

// Instantiation
const counter = createCounter(); // createCounter() runs and finishes execution here

console.log(counter()); // 1
console.log(counter()); // 2 (The "count" variable was remembered!)

// Higher order functions
// A Higher-Order Function (HOF) is a function that does at least one of the following
//Takes one or more functions as arguments (callbacks).
// Returns a new function as its output.

//Accepting Function as an argument
// HOF: Accepts a callback function
function repeatAction(n, action) {
  for (let i = 0; i < n; i++) {
    action(i); // Invoking the callback
  }
}

repeatAction(3, console.log); // Outputs: 0, 1, 2

//Common Built-in Examples:
// array.map(callback)
// array.filter(callback)
// setTimeout(callback, delay)

// Returning a Function
// HOF: Returns a brand-new function
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10

const triple = createMultiplier(3);
console.log(triple(5)); // 15

// Callbacks
// A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete a routine or action

// Synchronous Callbacks
// Executed immediately during the execution of the higher-order function. They block further code execution until they complete.
const numbers = [4, 5, 6];
// console.log is a synchronous callback passed to forEach
numbers.forEach((num) => console.log(num));

// 2. Asynchronous Callbacks
// Executed at a later time, usually after an asynchronous operation (like an API request, file read, or timer) finishes. They do not block the rest of your code from running.
console.log("Start");

setTimeout(() => {
  console.log("Callback triggered after 2 seconds");
}, 2000);

console.log("End");
// Output order: "Start" -> "End" -> "Callback triggered after 2 seconds"

//Callback Hell
// Callback Hell (also known as the Pyramid of Doom) refers to an anti-pattern in JavaScript where multiple nested callback functions are chained together inside asynchronous operations. This structure makes the code grow horizontally rather than vertically, making it incredibly difficult to read, maintain, and debug.
// A classic example of unmanageable horizontal code growth

// Visual Structure
getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      getFinalData(c, function (d) {
        console.log("Final Output: " + d);
      });
    });
  });
});

// Promises
// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to handle asynchronous operations sequentially and cleanly without falling into callback hell.

// Promise states:-
// Pending: The initial state; the asynchronous operation is still running.
// Fulfilled: The operation completed successfully; .then() is triggered.
// Rejected: The operation failed with an error; .catch() is triggered.

const request = new Promise((resolve, reject) => {
  let success = true; // Simulating outcome

  if (success) {
    resolve("Data downloaded successfully!"); // Sets state to Fulfilled
  } else {
    reject("Network Error."); // Sets state to Rejected
  }
});
request
  .then((result) => console.log(result)) // "Data downloaded successfully!"
  .catch((error) => console.error(error)) // Handles errors
  .finally(() => console.log("Done.")); // Runs no matter what

//   Promise chaining
// Returning a new promise or value inside a .then() block allows you to flatten sequential asynchronous calls vertically.
fetchUser()
  .then((user) => fetchPosts(user.id)) // Returns a new promise
  .then((posts) => console.log(posts)) // Receives the posts data
  .catch((err) => console.error(err)); // Catches errors from ANY step above

//Functional programming
//  a declarative programming paradigm where programs are constructed by applying and composing pure functions, avoiding shared state, mutable data, and side effects.

// Pure Functions
// A function is pure if it meets two criteria:
// Identical Output: Passing the same arguments will always return the exact same result.
// No Side Effects: It does not modify any external state, variables, or files outside its own block scope.

// Pure Function (Safe and predictable)
const add = (a, b) => a + b;

// Impure Function (Modifies external variable)
let total = 0;
const impureAdd = (a) => (total += a);




// Immutability
// Data objects or arrays cannot be modified after they are created. Instead of changing an existing array or object, you generate a brand-new copy containing your changes.
const items =[1, 2, 3];
// Instead of items.push(4) which mutates, use the spread operator:
const newItems = [...items, 4]; 







// JavaScript provides built-in higher-order functions that respect functional programming by producing new data without modifying the source array:
// map(): Transforms every element in an array.
// filter(): Selects a subset of elements based on a conditional test.
// reduce(): Combines all array elements into a single aggregate value.
