// 6

// Classes:- Introduced in ES6, Classes are syntactic sugar over JavaScript's existing prototype-based inheritance. They provide a cleaner, closer approximation to traditional object-oriented programming languages.

class User {
  constructor(name, role) {
    this.name = name; // Instance property
    this.role = role;
  }

  // Prototype Method (shared automatically across instances)
  greet() {
    return `Hello, I am ${this.name}`;
  }
}

const admin = new User("Alice", "Admin");


//Inheritance:- Classes use the extends keyword to inherit from a parent class. The super() function must be called in the child constructor to invoke the parent constructor and bind this.

class Admin extends User {
  constructor(name, clearanceLevel) {
    super(name, "Admin"); // Calls the parent constructor
    this.clearanceLevel = clearanceLevel;
  }

  // Method overriding
  greet() {
    return `${super.greet()} (Level ${this.clearanceLevel})`;
  }
}




// Getter ad Setter
// Getter (get): Runs code when you read a value.
// Setter (set): Runs code when you write/change a value.


class Wallet {
  constructor(initialCash) {
    // 💡 The underscore (_) means: "Treat this as private internal data"
    this._cash = initialCash; 
  }

  // 1. GETTER: Triggers when you do `console.log(myWallet.cash)`
  get cash() {
    return `$${this._cash}`; // Automatically adds a dollar sign
  }

  // 2. SETTER: Triggers when you do `myWallet.cash = 50`
  set cash(amount) {
    if (amount < 0) {
      console.log("Error: You cannot have negative cash!");
    } else {
      this._cash = amount; // Saves the valid amount
    }
  }
}

const myWallet = new Wallet(100);

// Using the GETTER
console.log(myWallet.cash); // Output: "$100" (Notice: NO parentheses `()`)

// Using the SETTER with valid data
myWallet.cash = 250; 
console.log(myWallet.cash); // Output: "$250"

// Using the SETTER with invalid data
myWallet.cash = -50;        // Output: "Error: You cannot have negative cash!"
console.log(myWallet.cash); // Output: "$250" (The value remained unchanged)




// Encapsulation, inheritance, polymorphism, and abstraction are the four core principles of Object-Oriented Programming (OOP) that allow developers to build structured, reusable, and secure software.

// 1. Encapsulation (Data Hiding) 
// Encapsulation bundles data (variables) and methods (functions) into a single unit called a class, while restricting direct access to the internal data. 

// • How it works: Variables are marked . Outside code can only modify or read them using public  and  methods. 
// • Real-world analogy: An ATM machine. You interact with a screen to withdraw money, but you cannot touch the cash vaults or the internal logic directly. 
// • Benefit: It protects data from accidental modification and ensures security. 

// 2. Inheritance (Code Reuse) 
// Inheritance allows a new class (child or subclass) to automatically acquire the properties and behaviors of an existing class (parent or superclass). 

// • How it works: A child class uses a keyword like  to copy the code of a parent class and add its own unique features. 
// • Real-world analogy: A Car and a Motorcycle both inherit properties like an engine and wheels from a parent class called Vehicle. 
// • Benefit: It eliminates redundant code by promoting the "Don't Repeat Yourself" (DRY) principle.

// 3. Polymorphism (Many Forms) 
// Polymorphism allows a single method, function, or object to behave differently based on the context or the object calling it. 

// • How it works: It happens via Method Overriding (a child class redefines a parent method) or Method Overloading (same method name, different parameters). 
// • Real-world analogy: A universal remote control. Pressing the "Power" button turns on a TV, a DVD player, or an audio system depending on which device you point it at. 
// • Benefit: It offers flexibility by allowing a single interface to handle different types of data. 

// 4. Abstraction (Complexity Hiding) 
// Abstraction hides complex internal implementation details and only displays the essential features to the user. 

// • How it works: It is achieved using abstract classes or interfaces. It defines what an object does rather than how it does it. 
// • Real-world analogy: Driving a car. You only need to know how to use the steering wheel and pedals. You do not need to understand how the engine burns fuel under the hood. 
// • Benefit: It reduces system complexity and lets developers focus on high-level logic. 






// Method overloading and method overriding are core concepts in object-oriented programming that support polymorphism. Overloading happens when methods share a name but have different parameters within the same class. Overriding happens when a child class provides a new body for a method already defined in its parent class. [1]  


// Method Overloading 

// • Definition: Multiple methods share the exact same name inside a single class, but their parameter lists differ (by number, type, or order of arguments). 
// • Polymorphism type: It is a compile-time (or static) polymorphism feature. 
// • Inheritance: It does not require an inheritance relationship. 
// • Return type: Can be changed or kept the same, as long as parameters differ.



// Method Overriding 

// • Definition: A subclass defines a custom implementation of a method that already exists in its superclass using the exact same name and parameter signature. 
// • Polymorphism type: It is a run-time (or dynamic) polymorphism feature. 
// • Inheritance: It requires a parent-child (inheritance) relationship. 
// • Return type: Must be identical or a covariant return type.
