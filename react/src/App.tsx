import { useEffect, useState } from 'react'
import AddBook from './AddBook'
import './App.css'
import EditBook from './EditBook'

function App() {
  const [books, setBooks] = useState([])

  async function fetchBooks() {
    fetch('http://localhost:3000/api/v1/books')
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map(d => ({ ...d, isEditing: false }))

        setBooks(newData)
      })
  }

  async function handleDelete(id: string) {
    fetch(`http://localhost:3000/api/v1/books/${id}`, {
      method: 'DELETE'
    })

    const newBooks = books.filter(book => book._id !== id);
    setBooks(newBooks)
  }

  function handleEdit(id: string) {
    const bookToEditIdx = books.findIndex(book => book._id === id);

    const newBooks = [...books];
    newBooks[bookToEditIdx].isEditing = true;

    setBooks(newBooks)
  }

  return (
    <>
      <h5>Books</h5>
      <button onClick={fetchBooks}>Get All Books</button>    
      <ul> 
        {books.map((book, idx) => 
            (!book.isEditing ? (
              <li key={idx}>
                <p>{book.title}</p>
                {book.authors.map((author, i) => (
                  <p key={i}>{author}</p>
                ))}
                <button onClick={() => handleDelete(book._id)}>Delete book</button>
                <button onClick={() => handleEdit(book._id)}>Edit book</button>
              </li>
            ) : (
              <EditBook key={idx} setBooks={setBooks} books={books} book={book} />
            ))
          )}
        </ul>
        <AddBook setBooks={setBooks} />
    </>
  )
}

export default App
