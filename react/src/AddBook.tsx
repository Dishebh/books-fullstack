import { useState } from "react";

export default function AddBook({ setBooks }) {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();

        const authorsList = authors.split(', ');

        const res = await fetch('http://localhost:3000/api/v1/books/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                authors: authorsList
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const book = await res?.json();

        setBooks(prevBooks => [...prevBooks, book ])
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
            <label htmlFor="authors">Authors</label>
            <input type="text" id="authors" name="authors" placeholder="Enter authors with comma separated values" value={authors} onChange={e => setAuthors(e.target.value)} />
            <input type="submit" value="Sumbit" />
        </form>
    )
}