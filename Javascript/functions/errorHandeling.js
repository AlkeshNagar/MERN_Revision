// 8

//  this page contains try catch promise and chaining async and await

// Error handling allows your code to anticipate failures and handle them gracefully without crashing the entire application.

// try/catch/finally 

// try: Defines a block of code to be tested for errors while it is being executed.
// catch: Defines a block of code to be executed if an error occurs in the try block. It receives the error object.
// finally: Defines a block of code to be executed regardless of the try and catch results. It always runs after control leaves the try/catch blocks.

try {
  let result = riskyOperation(); 
  console.log(result);
} catch (error) {
  console.error("An error occurred: " + error.message); // Handles the failure
} finally {
  console.log("Cleanup operations run here."); // Always runs
}



// throw keyword
// You can explicitly generate your own runtime exceptions by using the throw keyword followed by an expression (usually an Error object).

function checkAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative."); // Code execution stops here
  }
  return true;
}



// Custom Errors (Extending Error)
// For complex applications, creating specialized custom error classes helps you differentiate between types of failures (e.g., Database errors vs. Validation errors).

// Inherits properties from the native Error class
class ValidationError extends Error {
  constructor(message) {
    super(message);          // Passes message to the parent Error class
    this.name = "ValidationError"; // Customizes the error name
  }
}

// ➡️ Implementation
try {
  throw new ValidationError("Invalid email format!");
} catch (error) {
  console.error(error.name);    // "ValidationError"
  console.error(error.message); // "Invalid email format!"
}



// Strict Mode
// Strict mode opts your code into a restricted variant of JavaScript, changing silent errors into throwing runtime errors.
// Activation: Place "use strict"; at the very top of a script file or a function body.
// Key Restrictions:
// Prevents accidental globals: x = 10; throws a ReferenceError if x wasn't declared.
// Eliminates this coercion: Inside a regular function call, this evaluates to undefined instead of the window or global object.
// Disallows duplicate parameter names: function doSomething(a, a) {} throws a SyntaxError.
// Prevents deleting undeletable properties: delete Object.prototype; throws a TypeError.




// Promise and promise chaining
// A Promise handles asynchronous operations cleanly. Promise Chaining flattens code by returning a new promise or value inside a .then() block, allowing sequential execution down a vertical line.
fetchUser(1)
  .then(user => fetchPosts(user.id)) // Returns a new promise
  .then(posts => console.log(posts)) // Handles the posts data
  .catch(err => console.error(err)); // Handles any error from the entire chain



// 
const p1 = Promise.resolve("Success A");
const p2 = Promise.reject("Failure B");
const p3 = Promise.resolve("Success C");

// 1. Promise.all: - When all input promises fulfill. rejects, Instantly, if any single promise rejects (Short-circuits).
Promise.all([p1, p3]).then(console.log); // ["Success A", "Success C"]
Promise.all([p1, p2, p3]).catch(console.log); // "Failure B" (Short-circuits)

// 2. Promise.allSettled:-When all input promises settle (either fulfill or reject). never rejects
Promise.allSettled([p1, p2]).then(console.log);
// Output: [{status: "fulfilled", value: "Success A"}, {status: "rejected", reason: "Failure B"}]

// 3. Promise.any:- When the first promise fulfills successfully.rejects Only if all input promises fail and reject.
Promise.any([p1, p2, p3]).then(console.log); // "Success A" (Fastest success)

// 4. Promise.race:- When the very first promise settles (either fulfills or rejects). rejects Instantly, if the fastest promise happens to reject.









// Async / Await
// Introduced in ES8, Async/Await is syntactic sugar wrapped around JavaScript Promises. It allows you to write asynchronous, non-blocking code that reads and looks exactly like synchronous code

// async Keyword
// Placed directly before a function declaration or expression.
// Behavior: Forces the function to always return a Promise. If the function returns a raw value, JavaScript automatically wraps that value inside a resolved promise.

async function greet() {
  return "Hello"; // Automatically wrapped as Promise.resolve("Hello")
}
greet().then(console.log); // "Hello"



//  await Keyword
// Can only be used inside a function marked with the async keyword.
// Behavior: Pauses the execution of the async function line-by-line until the target Promise settles (fulfills or rejects).
// Crucially, it does not block the browser's main execution thread; it simply yields control back to the engine while waiting.


async function fetchDashboardData() {
  // Code pauses here until the fetch promise resolves
  const response = await fetch("https://example.com");
  const data = await response.json();
  return data;
}
