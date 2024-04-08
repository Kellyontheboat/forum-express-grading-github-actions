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

  getRestaurants: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''
    return Promise.all([
      Restaurant.findAll({
        include: Category,
        where: {
          ...categoryId ? { categoryId } : {} // 檢查 categoryId 是否為空值
        },
        raw: true,
        nest: true
      }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurants, categories]) => {
        const data = restaurants.map(r => ({
          ...r,
          description: r.description.substring(0, 50)
        }))
        return res.render('restaurants', { restaurants: data, categories })
      })
      .catch(err => next(err))
      /*const where = {}
      if (categoryId) where.categoryId = categoryId
      return Restaurant.findAll({
      include: Category,
      where: where, */
  },

  getDashboard: (req, res, next) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category,
      raw: true,
      nest: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error("Dashboard didn't exist!")
        res.render('dashboard', { restaurant })
      })
  }
}

module.exports = restaurantController
