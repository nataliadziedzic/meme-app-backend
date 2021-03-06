const express = require('express')
const router = express.Router()
const Meme = require('../models/meme')

router.get('/', async (req, res) => {
  try {
    const memes = await Meme.find()
    res.json(memes)
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
})

router.get('/:id', getMeme, (req, res) => {
  res.json(res.meme)
})
router.post('/', async (req, res) => {
  const meme = new Meme({
    author: req.body.author,
    title: req.body.title,
    image: req.body.image,
  })
  try {
    const newMeme = await meme.save()
    res.status(201).json(newMeme)
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
})

router.patch('/:id', getMeme, async (req, res) => {
  if (req.body.title !== undefined) {
    res.meme.title = req.body.title
  }
  if (req.body.upvotes !== undefined) {
    res.meme.upvotes = req.body.upvotes
  }
  if (req.body.downvotes !== undefined) {
    res.meme.downvotes = req.body.downvotes
  }
  try {
    const updatedMeme = await res.meme.save()
    res.json(updatedMeme)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getMeme, async (req, res) => {
  try {
    await res.meme.remove()
    res.json({ message: 'Meme has been succesfully deleted' })
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})

async function getMeme(req, res, next) {
  let meme
  try {
    meme = await Meme.findById(req.params.id)
    if (meme === null) {
      return res.status(404).json({ message: 'Cannot find meme' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.meme = meme
  next()
}

module.exports = router
