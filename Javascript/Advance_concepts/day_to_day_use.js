// 11

// Recursion
// Programming technique where a function calls itself repeatedly to solve a problem by breaking it down into smaller, manageable sub-problems.

//  Two Essential Rules

// Base Case: The condition that stops the recursion loop. Without it, the function calls itself infinitely, leading to a stack overflow error (RangeError: Maximum call stack size exceeded).
// Recursive Case: The logic where the function calls itself with modified arguments, moving closer to the base case.

// Example: Calculating a Factorial (e.g., 5! = 5 * 4 * 3 * 2 * 1)
function factorial(n) {
  if (n <= 1) return 1; // 1. Base Case
  return n * factorial(n - 1); // 2. Recursive Case
}
console.log(factorial(5)); // 120

// Currying
// Currying is an advanced functional programming transformation technique where a function that takes multiple arguments is converted into a sequence of nested functions, each accepting exactly one single argument
// Standard function

const standardAdd = (a, b) => a + b;

// Curried function conversion
const curriedAdd = (a) => (b) => a + b;

// ➡️ How you use it:
const addFive = curriedAdd(5); // Locks down 'a' as 5
console.log(addFive(3)); // 8 (Passes 'b' as 3)
console.log(curriedAdd(2)(3)); // 5

//  Memoization
// Memoization is an optimization technique used to speed up computer programs by caching (storing) the results of expensive, heavy function calls. When the exact same inputs occur again, the function skips calculations and returns the cached result instantly.

function memoizeSquare() {
  const cache = {}; // Isolated cache store

  return function (num) {
    if (num in cache) {
      console.log("Fetching from cache...");
      return cache[num]; // Returns instantly
    }

    console.log("Calculating heavy math logic...");
    const result = num * num; // Simulating expensive logic
    cache[num] = result; // Save to cache
    return result;
  };
}

const optimizedSquare = memoizeSquare();
console.log(optimizedSquare(10)); // Logs: "Calculating heavy math logic..." -> 100
console.log(optimizedSquare(10)); // Logs: "Fetching from cache..." -> 100







// Memory Leaks
// A Memory Leak occurs when objects are no longer required by an application, but are mistakenly kept reachable from the root execution contexts, rendering the Garbage Collector unable to release them.