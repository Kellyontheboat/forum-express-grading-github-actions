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
          //return res.redirect('/admin/categories')
        }
        return res.render('admin/categories', { categories, category })
      })
      .catch(err => next(err))
  },

  postCategory: (req, res, next) => {
    const { category } = req.body
    if (!category) {
      req.flash('error_messages', 'please enter a category name')
      return res.redirect('back')
    }
    return Category.create({ name: category })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { category } = req.body
    if (!category) {
      req.flash('error_messages', 'please enter a category name')
      return res.redirect('back')
    }
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          req.flash('error_messages', 'Category not found')
          return res.redirect('/admin/categories')
        }
        return category.update({ name: req.body.category })
          .then(() => res.redirect('/admin/categories'))
          .catch(err => next(err))
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
