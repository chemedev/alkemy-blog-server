const express = require('express')
const router = express.Router()
const multer = require('multer')

const postController = require('../controllers/postController')

// const storage = multer.diskStorage({})

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname)
    }
  })
})

router.get('/', postController.fetchPosts)
router.get('/:id', postController.fetchPost)
router.post('/', upload.single('img'), postController.createPost)
router.patch('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router
