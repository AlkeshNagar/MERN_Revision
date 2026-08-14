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
