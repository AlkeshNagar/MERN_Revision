// 4





//Spread and rest operators
//Spread operator: It allows an iterable such as an array or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

//Rest operator: It allows us to represent an indefinite number of arguments as an array. It is used in function parameter lists to collect all remaining arguments into a single array parameter.
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}


// Template literals:-Template literals are string literals that allow embedded expressions, multi-line strings, and string interpolation. They use backticks (`) instead of single or double quotes
const name = "John";
const age = 30;
const message = `Hello, my name is ${name} and I am ${age} years old.`;



//Optional chaining (?.):- Optional chaining is a feature that allows you to safely access deeply nested properties of an object without having to check if each reference in the chain is valid. If any reference in the chain is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.
const user = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York"
  }
};
const street = user.address?.street; // "123 Main St"
const country = user.address?.country; // undefined







//Nullish coalescing operator (??):- The nullish coalescing operator is a logical operator that returns its right-hand operand when its left-hand operand is null or undefined, and otherwise returns its left-hand operand. It is useful for providing default values for potentially null or undefined variables.
const any = null ?? "default string"; 

// ?? vs ||: The nullish coalescing operator (??) only considers null and undefined as nullish values, while the logical OR operator (||) considers any falsy value (null, undefined, 0, "", false, NaN) as a reason to return the right-hand operand. Therefore, ?? is more precise when you want to provide a default value only for null or undefined, while || may lead to unintended results if you want to allow other falsy values.

//operator precedence constraint: You cannot combine ?? directly with standard logical operators like && and || without explicitly defining evaluation order using parentheses. Doing so throws a SyntaxError

// invalid syntax
// let result = val1 && val2 ?? "default"; 

// valid syntax
let result = (val1 && val2) ?? "default";



//  Browser Storage system

// cookies:- 4KB, manually set, Any window/tab on matching domain.,  Sent automatically on HTTP requests., Session IDs, Authentication tokens.




// Local storage :- 5 - 10 KB, never expires, Any window/tab on matching domain., Purely client-side (Server can't see it)., User preferences, theme toggles, caching.

// 1. Storing data
localStorage.setItem("theme", "dark");

// 2. Retrieving data
const theme = localStorage.getItem("theme"); // "dark"

// 3. Removing data
localStorage.removeItem("theme");

// 4. Clearing everything out completely
localStorage.clear();





const user = { name: "John", age: 30 };

// Serialize to string before saving
localStorage.setItem("user", JSON.stringify(user));

// Deserialize back to object when reading
const retrievedUser = JSON.parse(localStorage.getItem("user"));


// Session Storage:- 5MB, expire on tab close, Restricted to that exact tab only., Purely client-side (Server can't see it)., Temporary multi-step form data.



