const { Restaurant, Category } = require('../models')

const restaurantController = {

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category,
      // 若沒有加入 nest: true &raw: true，則會回傳 Sequelize 物件,後面需要用restaurant.toJSON()轉換成JSON格式
      nest: true,
      raw: true
    }).then(restaurant => {
      return res.render('restaurant', { restaurant })
    })
  },

  getRestaurants: (req, res) => {
    Restaurant.findAll({
      include: Category,
      raw: true,
      nest: true
    }).then(restaurants => {
      const data = restaurants.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }))
      return res.render('restaurants', { restaurants: data })
    })
  }
}

module.exports = restaurantController
