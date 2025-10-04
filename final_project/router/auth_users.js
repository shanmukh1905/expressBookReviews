const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

// Login a registered user (Task 7)
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({message: "Invalid credentials"});
  }
  // Generate JWT and save in session
  const accessToken = jwt.sign({ username }, "fingerprint_customer", { expiresIn: '1h' });
  req.session.accessToken = accessToken;
  req.session.username = username;
  res.json({message: "Login successful", accessToken});
});

// Add or update a book review (Task 8)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.username;
  if (!books[isbn]) return res.status(404).send('Book not found');
  if (!books[isbn].reviews) books[isbn].reviews = {};
  books[isbn].reviews[username] = review;
  res.send("Review added/updated successfully");
});

// Delete user's own review (Task 9)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.username;
  if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.send("Review deleted");
  } else {
    res.status(404).send('Review not found');
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
