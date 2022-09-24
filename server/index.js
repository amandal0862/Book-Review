const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

//MySQL database connection
const db = mysql.createPool({
  host: "mysql_db", // the host name MYSQL_DATABASE: node_mysql
  user: "MYSQL_USER", // database user MYSQL_USER: MYSQL_USER
  password: "MYSQL_PASSWORD", // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: "books", // database name MYSQL_HOST_IP: mysql_db
});

// Express method to parse the POST method
const app = express();

//Enable CORS security headers
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//home page route
app.get("/", (req, res) => {
  res.send("Hi There");
});

//To retrieve books, we will add a route that will process a Select MySQL query to retrieve all the books from the database.
//get all of the books in the database
app.get("/get", (req, res) => {
  const SelectQuery = " SELECT * FROM books_reviews";
  db.query(SelectQuery, (err, result) => {
    res.send(result);
  });
});

// endpoint to process and INSERT SQL command
// add a book to the database
app.post("/insert", (req, res) => {
  const bookName = req.body.setBookName;
  const bookReview = req.body.setReview;
  const InsertQuery =
    "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    console.log(result);
  });
});

// Add a route that will allow us to delete a book record. This includes a bookId (unique ID for a book) to be deleted.
// delete a book from the database
app.delete("/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
  db.query(DeleteQuery, bookId, (err, result) => {
    if (err) console.log(err);
  });
});

// Add a route that will allow us to update a book review. This includes a bookId (unique ID for a book) to be updated.
// update a book review
app.put("/update/:bookId", (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err);
  });
});

// And add a port the will expose the API when the server is running. Here, we expose it to port 3001.
app.listen("3001", () => {
  console.log("Server is running on local http://localhost:3001/");
});
