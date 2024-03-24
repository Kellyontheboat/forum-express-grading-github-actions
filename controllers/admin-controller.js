const { Restaurant } = require('../models')
const adminController = {

  getRestaurants: (req, res, next) => {
    Restaurant.findAll({

      raw: true

    })

      .then(restaurants => res.render('admin/restaurants', { restaurants }))

      .catch(err => next(err))
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create-restaurant')
  },

  postRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    if (!name) throw new Error('請填入餐廳名稱')
    return Restaurant.create({
      name,
      tel,
      address,
      openingHours,
      description
    })
      .then(() => {
        req.flash('success_message', '新增成功！')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  }

}

module.exports = adminController
