const { Category } = require('../models')

const categoryController = {

  // getCategories: (req, res, next) => {
  //   const id = req.params.id
  //   if (id) return console.log('id:', id)

  //   return Category.findAll({ raw: true })
  //     .then(categories => {
  //       return res.render('admin/categories', { categories })
  //     })
  //     .catch(err => next(err))
  // },

  getCategories: (req, res, next) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => {
        if (!category) {
          req.flash('error_messages', 'Category not found')
        }
        return res.render('admin/categories', { categories, category })
      })
      .catch(err => next(err))
  },

  postCategory: (req, res, next) => {
    const { categoryName } = req.body
    if (!categoryName) {
      req.flash('error_messages', 'please enter a category name')
      return res.redirect('back')
    }
    return Category.create({ name: categoryName })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { categoryName } = req.body
    if (!categoryName) {
      req.flash('error_messages', 'please enter a category name')
      return res.redirect('back')
    }
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          req.flash('error_messages', 'Category not found')
          return res.redirect('/admin/categories')
        }
        return category.update({ name: categoryName })
          .then(() => res.redirect('/admin/categories'))
          .catch(err => next(err))
      })
      .catch(err => next(err))
  },
  deleteCategory: (req, res, next) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          req.flash('error_messages', 'Category not found')
          return res.redirect('/admin/categories')
        }
        // await Restaurant.update({ category_id: null }, { where: { category_id: categoryId } })
        return category.destroy()
          .then(() => res.redirect('/admin/categories'))
      })
      .catch(err => next(err))
  }
}
module.exports = categoryController
