const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategories)
// router.post('/', categoryController.postCategory)
// router.put('/', categoryController.updateCategory)
// router.delete('/', categoryController.deleteCategory)

module.exports = router
