// 9

// JSON (JavaScript Object Notation)
// JSON is a lightweight, text-based data interchange format based on JavaScript object syntax. It is completely language-independent and acts as the universal standard for sending data over the web

// JSON.stringify(object) ➡️ Converts a JavaScript object into a JSON string (Serialization).

// JSON.parse(jsonString) ➡️ Converts a JSON string back into a JavaScript object (Deserialization).




//  Fetching Data (GET Request)
// By default, fetch() performs an HTTP GET request. It requires a two-step promise resolution: first for the HTTP network response header, and second to parse the body data as JSON.

fetch("https://example.com")
  .then(response => {
    // 💡 Always check response.ok to handle HTTP errors (like 404 or 500)
    if (!response.ok) throw new Error("Network response failed");
    return response.json(); // Parses data as a promise
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch Error:", error));


//   Sending Data (POST Request)
// To send data to a server, pass an options configuration object as the second argument specifying the method, headers, and stringified body data.
const newUser = { name: "Alice", role: "Developer" };

fetch("https://example.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json" // Informs the server we are sending JSON text
  },
  body: JSON.stringify(newUser) // Convers data payload to a string
})
  .then(res => res.json())
  .then(data => console.log("Success:", data));



// Modern Async/await implementation

async function loadUserData() {
  try {
    const response = await fetch("https://example.com");
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const user = await response.json();
    console.log(user);
  } catch (err) {
    console.error("Async Fetch Failed:", err.message);
  }
}






// REST API (Representational State Transfer Application Programming Interface)

// an architectural style that allows two different software applications to communicate with each other over the internet using standard web protocols

//  How it actually works 
// Communication happens using HTTP requests. A client sends a request containing a specific URL (endpoint) and an HTTP Method (verb) to tell the server what action to perform.
// GET (Read) Retrieves a resource or a list of resources.
// POST (Create) Submits new data to create a brand-new resource.
// PUT (Update) Completely replaces an existing resource with a new dataset.
// PATCH (Modify) Updates only specific partial properties of an existing resource.
// DELETE (Remove) Deletes a specific resource.

const BASE_URL = "https://typicode.com";

// 1. GET - Read a resource
async function getPost(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}

// 2. POST - Create a resource
async function createPost(newPostData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPostData)
  });
  return await response.json();
}

// 3. PATCH - Partially update an existing resource
async function updatePostTitle(id, newTitle) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }) // Updates ONLY the title
  });
  return await response.json();
}

// 4. DELETE - Remove a resource
async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  return response.ok; // Returns true if successfully deleted
}






//CORS
// CORS is a browser-enforced security mechanism that restricts a webpage from making HTTP requests to a domain different from the one that served the webpage.

// An Origin is defined by three specific components combined: Protocol, Domain (Host), and Port. If any of these three do not match exactly, the request is considered cross-origin



