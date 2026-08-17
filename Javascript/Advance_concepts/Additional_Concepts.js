//  10

// Debouncing vs Throttling
// both are performance optimizationtechniques used to limit the nuber of times a high frequency function executes over time (e.g., during window resizing, scrolling or typing).

// Debouncing: Groups multiple sequential function calls into a single execution that triggers only after a specified period of complete inactivity. (The timer resets on every single interaction).

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    //clear the previous pending timer if the user acts again
    clearTimeout(timeoutId);

    // set a fresh timer
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Only triggers 500ms after the user stops typing
const handleSearch = debounce((e) => console.log(e.target.value), 500);
document.querySelector("input").addEventListener("input", handleSearch);

// Throttling: Enforces a maximum execution rate, ensuring the function triggers only once per specified time interval, completely ignoring any rapid interactions in between.

function throttle(func, interval) {
  let isWaiting = false;

  return function (...args) {
    // Ignore actions if we are currently inside the cool-down window
    if (isWaiting) return;

    func.apply(this, args);
    isWaiting = true;

    // Reset the block after the interval finishes
    setTimeout(() => {
      isWaiting = false;
    }, interval);
  };
}

// Usage: Triggers at most once every 300ms while scrolling
const handleScroll = throttle(() => console.log("Window Scrolled!"), 300);
window.addEventListener("scroll", handleScroll);












// ************************************************



// Deep topic, Read carefully


// Iterators
// An Iterator is an object that defines a sequence and returns a value upon its termination using a standardized method interface.

// The Iterator Protocol: To be an iterator, an object must implement a next() method.
// The Output: The next() method must return an object containing two specific properties:
// value: The next sequential value in the iteration.
// done: A boolean set to true if the iterator has reached the end of the sequence, or false if more values remain.

// A simple custom iterator function
function createIterator(array) {
  let nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}

// Generators
// A Generator is a special type of function that can pause its execution mid-way, return a temporary value, and later resume exactly from where it left off. They act as factories for generating custom Iterators smoothly.

// While a regular function follows a "run-to-completion" model (blocking the single thread until it returns a value), a generator function acts as a stateful, iterative data stream. They are highly efficient for handling massive data sets because they compute values lazily (on-demand), saving vast amounts of memory.

// A generator is defined using the function* syntax and uses the unique yield keyword to pause itself. Calling a generator function does not run the code inside; instead, it returns an internal Generator Object (which conforms to the iterator protocol).

function* numberStepper() {
  console.log("Started");
  yield 1; // Pauses here and returns 1
  console.log("Resumed");
  yield 2; // Pauses here and returns 2
  return 3; // Ends the generator
}

const iterator = numberStepper();

// To execute the code, you call the .next() method
console.log(iterator.next()); // Prints: "Started" -> Logs: { value: 1, done: false }
console.log(iterator.next()); // Prints: "Resumed" -> Logs: { value: 2, done: false }
console.log(iterator.next()); // Logs: { value: 3, done: true }

//  Symbols & Custom Iterables
// In JavaScript, Symbols provide the blueprint, and Iterables are the implementation. Together, they allow you to customize how your objects behave when used with standard native features like for...of loops, array destructuring, or the spread operator (...).

// Symbols: The Foundation
// A Symbol is a completely unique, primitive data type. Even if you create two symbols with the same description, they are entirely distinct:
const sym1 = Symbol("key");
const sym2 = Symbol("key");
console.log(sym1 === sym2); // false

// In short, Symbols offer unique property keys that prevent structural library naming collisions.
// Means, if we have same key name or value it will be different as two different values, which are same, are not equal to each other as it returns false above.



// JavaScript uses built-in, hidden symbols called Well-Known Symbols to expose internal engine behaviors. The most critical one for looping is Symbol.iterator

// What makes something an "Iterable"?
// An object is considered an Iterable if it defines a specific method using the Symbol.iterator key.
// When we use a loop like for (let item of collection), JavaScript checks if collection[Symbol.iterator] exists. If it does, it calls that method to fetch an iterator object.
// The iterator object must have a .next() method that returns a specific payload structure: { value: Any, done: Boolean }.

// Creating a Custom Iterable (Step-by-Step)
// Imagine you want to build a classroom object. You want to be able to loop over this object to see all the students sequentially, but objects do not support for...of loops by default.
const classroom = {
  teamA: ["Alice", "Bob"],
  teamB: ["Charlie", "David"],

  // 1. Define the special Well-Known Symbol method
  [Symbol.iterator]() {
    const allStudents = [...this.teamA, ...this.teamB];
    let index = 0;

    // 2. Return the Iterator Object containing the .next() function
    return {
      next() {
        if (index < allStudents.length) {
          return { value: allStudents[index++], done: false }; // Keep looping
        } else {
          return { value: undefined, done: true }; // Stop looping
        }
      },
    };
  },
};

// Now your custom object instantly works with native loops!
for (const student of classroom) {
  console.log(student); // Prints: Alice, Bob, Charlie, David
}

// It also works with the spread operator!
const studentArray = [...classroom];
console.log(studentArray); // ["Alice", "Bob", "Charlie", "David"]



//  Making Custom Iterables Cleaner with Generators
// Writing out the manual object return structure with an index tracker can feel highly boilerplate-heavy. Because Generators naturally output an iterator interface with .next() and { value, done } automatically, you can use a generator function to write custom iterables cleanly
const simplifiedClassroom = {
    teamA: ["Alex", "Blake"],
    teamB: ["Casey", "Drew"],

    // We assign a generator function directly to the iterator symbol
    *[Symbol.iterator]() {
        yield* this.teamA; // yield* delegates iteration directly to the arrays
        yield* this.teamB;
    }
};

for (const name of simplifiedClassroom) {
    console.log(name); // Prints: Alex, Blake, Casey, Drew
}


// Symbols offer unique property keys that prevent structural library naming collisions.
// Two symbols with the identical string label
const key1 = Symbol("userId");
const key2 = Symbol("userId");

console.log(key1 === key2); // false






// Functional Composition
// Functional composition is an advanced functional programming architecture design pattern where you combine two or more simple functions to construct a more complex, unified function.
// The output of each nested function serves directly as the input argument for the next adjacent function (f(g(x))).

const lowercase = (str) => str.toLowerCase();
const shout = (str) => `${str}!`;

// Pure Composition
const compose = (f, g) => (x) => f(g(x));

const quietShout = compose(shout, lowercase);
console.log(quietShout("HELLO")); // "hello!"
