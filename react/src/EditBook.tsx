import { useState } from "react";

export default function EditBook({ book, setBooks, books }) {
    const [title, setTitle] = useState(book.title);
    const [authors, setAuthors] = useState(book.authors.join(', '));

    async function handleSubmit(e: any) {
        e.preventDefault();

        const authorsList = authors.split(', ');

        const res = await fetch(`http://localhost:3000/api/v1/books/${book._id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title,
                authors: authorsList
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const newBook = await res.json();

        const bookToFindIdx = books.findIndex(b => b._id === book._id);

        const newBooks = [...books];
        newBooks[bookToFindIdx] = newBook;
        newBooks[bookToFindIdx].isEditing = false;

        console.log({newBooks});
        

        setBooks(newBooks)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
            <label htmlFor="authors">Authors</label>
            <input type="text" id="authors" name="authors" placeholder="Enter authors with comma separated values" value={authors} onChange={e => setAuthors(e.target.value)} />
            <input type="submit" value="Save" />
        </form>
    )
}