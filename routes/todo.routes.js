const {Router} = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {title} = req.body

    const existing = await Todo.findOne({ title })

    if (existing) {
      return res.json({ Todo: existing })
    }

    const todo = new Todo({
      title, owner: req.user.userId
    })

    await todo.save()

    res.status(201).json({ todo })
  } catch (e) {
    res.status(500).json({ message: 'Problem with "create"' })
  }
})

router.get('/todos', auth, async (req, res) => {
  try {
    const todo = await Todo.find({ owner: req.user.userId })
    res.json(todo)
  } catch (e) {
    res.status(500).json({ message: 'Some problems' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    res.json(todo)
  } catch (e) {
    res.status(500).json({ message: 'Problem with find by id' })
  }
})

module.exports = router