const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user (Task 6)
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({message: "Username and password required"});
  if (users[username])
    return res.status(409).json({message: "Username exists"});
  users[username] = { password };
  res.status(201).json({message: "User registered successfully"});
});


// List all books (Task 1)
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});


// Get book details by ISBN (Task 2)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.send(book);
  } else {
    res.status(404).send('Book not found');
  }
});

  
// Get books by author (Task 3)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const bookList = Object.values(books).filter(book => book.author === author);
  res.send(bookList);
});


// Get books by title (Task 4)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const bookList = Object.values(books).filter(book => book.title === title);
  res.send(bookList);
});


// Get reviews for a book (Task 5)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.send(book.reviews);
  } else {
    res.status(404).send('No reviews found for this book');
  }
});


module.exports.general = public_users;
