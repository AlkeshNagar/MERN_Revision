// 2

//Arrays and objects are reference types in javascript. they are stored in heap memory and accessed by reference.
// Arrays:- used to store multiple values in a single variable. Arrays are zero-indexed, meaning the first element is at index 0.
const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // "Apple"
console.log(fruits.length); // 3




//Array methods

//Modifying methods:- push(), pop(), shift(), unshift(), splice(), sort(), reverse()
let numbers = [1, 2, 3, 4, 5, 6];
numbers.push(7); // adds 7 at the end
numbers.pop();// removes the last element
numbers.shift(); // removes the first element
numbers.unshift(0);// adds 0 at the begining


numbers.splice(2, 1); //  removes 1 element at index 2; 
// array.splice(start, deleteCount, item1, item2, ...)
// start: The index where the modification begins.
// deleteCount: The number of elements to remove from that index.
// item1, item2, ... (Optional): The new elements to insert into the array.



//SORT() METHOD
numbers.sort(); //The sort() method sorts the elements of an array in place and returns the reference to the same sorted array. By default, it sorts elements as strings in alphabetical and ascending order.


//Because the default sort converts items to strings, sorting numbers directly leads to incorrect results. For example, "10" comes before "2" because "1" is smaller than "2"
// Ascending Order (Smallest to Largest)
numbers.sort((a, b) => a - b);
console.log(numbers); // Output: [2, 5, 10, 25] ✅

// Descending Order (Largest to Smallest)
numbers.sort((a, b) => b - a);
console.log(numbers); // Output: [25, 10, 5, 2] ✅

numbers.reverse(); //The reverse() method reverses the order of the elements in an array in place. the first array element becomes the last and the last becomes the first.

//Non-modifying methods:- concat(), join(), slice(), indexOf(), includes(), find()
numbers.concat([7, 8, 9]); //The concat() method is used to merge two or more arrays. this method does not change the existing arrays, but instead returns a new array.
numbers.join(", "); //The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.
numbers.slice(1, 4); //The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.

numbers.indexOf(3); //The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
numbers.includes(3); //The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
numbers.find(3); //The find() method returns the first element in the array that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned.


// iteration methods:- forEach(), map(), filter(), reduce()
numbers.forEach((num) => console.log(num)); //The forEach() method executes a provided function once for each array element.
numbers.map((num) => num * 2); //The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
numbers.filter((num) => num > 3); //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
numbers.reduce((acc, num) => acc + num, 0); //The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value. accumulator (acc) is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied. currentValue (num) is the current element being processed in the array. initialValue is a value to use as the first argument to the first call of the callback. If no initialValue is supplied, the first element in the array will be used and skipped.
// here the output will be the sum of all the elements in the array.
