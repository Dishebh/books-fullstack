const router = require('express').Router();

const Books = require('../../Models/Books');

router.get('/', async (req, res) => {
    const books = await Books.find({})

    res.status(200).send(books)
})

router.post('/', async (req, res) => {
    console.log('req!', req.body)

    const book = new Books({
        title: req.body.title,
        authors: req.body.authors,
    })

    await book.save()

    res.status(201).send(book)
})

router.patch('/:id', async (req, res) => {
    const book = await Books.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        authors: req.body.authors,
    }, {
        new: true,
    })

    await book.save()

    res.status(200).send(book)
})

router.delete('/:id', async (req, res) => {
    await Books.findByIdAndDelete(req.params.id)
    res.send('book deleted');
})

module.exports = router