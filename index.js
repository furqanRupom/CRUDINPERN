const express = require("express");
const { v4: uuidv4 } = require("uuid");
const pool = require("./dbConnect");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// post

app.post("/books", async (req, res) => {
  try {
    const id = uuidv4();
    const { name, description } = req.body;

    // inserting new book data

    const newBook = await pool.query(
      "INSERT INTO BOOK (id,NAME,DESCRIPTION) VALUES ($1 , $2 , $3) RETURNING *",
      [id, name, description]
    );

    return res
      .status(201)
      .json({
        message: ` Successfully created the books `,
        data: newBook.rows,
      });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: "it occurs an error" + error.message,
    });
  }
});

// get operation routes (all books)

app.get("/books", async (req, res) => {
  try {
    // get all the books
    const books = await pool.query("SELECT * FROM book");
    return res
      .status(200)
      .json({ message: "Successfully get all the books", data: books.rows });
  } catch (error) {
    return res
      .status(404)
      .json({ error: true, message: "it occurs an error" + error.message });
  }
});

// single books by id

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await pool.query("SELECT * FROM book WHERE id=$1", [id]);

    return res
      .status(200)
      .json({ message: "Successfully get the book", data: book.rows });
  } catch (error) {
    return res
      .status(404)
      .json({ error: true, message: "it occurs an error" + error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteBook = await pool.query("DELETE FROM book WHERE id=$1", [id]);
    return res.status(200).json({
      message: "Successfully delete the books",
      data: deleteBook.rows,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ error: true, message: "it occurs an error", error });
  }
});


app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {name,description} = req.body;
    console.log(req.body)

    const updateBook = await pool.query("UPDATE book SET name=$1,description=$2 WHERE id=$3 RETURNING *",[name,description,id])

    return res.status(200).json({ message: "Successfully update the books",data:updateBook.rows});
  } catch (error) {
    return res
      .status(404)
      .json({ error: true, message: "it occurs an error" + error.message });
  }
});

app.listen(port, () => {
  console.log(`bookAPI is running on port ${port}`);
});
