const Category = require('../models/Category')

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    const error = new Error(err)
    console.log('getCategories:', error.message)
    res.status(403).json(error.message)
  }
}
