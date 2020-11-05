const Post = require('../models/Post')
const { isValidFile } = require('../helpers')
const Category = require('../models/Category')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')

module.exports.fetchPosts = async (req, res) => {
  try {
    const data = await Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'img', 'categoryId', 'createdAt']
    })
    if (!data) throw new Error('No posts submitted yet')
    res.json({ error: null, data })
  } catch (err) {
    console.log('fetchPosts:', error.message)
    res.json({ error: error.message, data: [] })
  }
}

module.exports.fetchPost = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Post.findOne({
      where: { id },
      attributes: ['id', 'title', 'img', 'categoryId', 'createdAt']
    })
    if (!data) throw new Error('Post not found')
    res.json({ error: null, data })
  } catch (error) {
    console.log('fetchPost:', error.message)
    res.json({ error: error.message, data: [] })
  }
}

module.exports.createPost = async (req, res) => {
  try {
    if (req.file) {
      if (!isValidFile(req.file, true)) {
        return res.status(406).json({
          error: 'Invalid upload. Use jpg, jpeg, png or webp extensions',
          data: []
        })
      }
      req.body.img = 'http://localhost:3001/' + req.file.path
    }

    if (req.body.img) {
      if (!isValidFile(req.body.img)) {
        return res.status(406).json({
          error: 'Invalid upload. Use jpg, jpeg, png or webp extensions',
          data: []
        })
      }
    }

    const newPost = {
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
      img: req.body.img
    }

    const data = await Post.create(newPost)

    res.status(201).json({ error: null, data })
  } catch (err) {
    if (err instanceof ValidationError)
      return res.status(406).json({ error: err.errors[0].message, data: [] })

    if (err instanceof ForeignKeyConstraintError) {
      return res.status(406).json({
        error: "Some value doesn't match our database data.",
        data: []
      })
    }

    return res.status(500).json({ error: 'Something went wrong.', data: [] })
    console.log(err)
  }
}

module.exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id
    const updatePost = {
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
      img: req.body.img
    }
    const post = await Post.findOne({ where: { id } })
    if (!post) throw new Error('Post not found')
    const data = await post.update(updatePost)
    res.status(202).json({ error: null, data })
  } catch (err) {
    console.log('updatePost:', err.message)
    res.json({ error: err.message, data: [] })
  }
}

module.exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Post.findOne({ where: { id } })
    if (!data) throw new Error('Post not found')

    await data.destroy()
    res.json({ error: null, data })
  } catch (err) {
    console.log('deletePost:', err.message)
    res.json({ error: err.message, data: [] })
  }
}
