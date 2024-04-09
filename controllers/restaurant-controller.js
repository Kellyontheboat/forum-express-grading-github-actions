const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Restaurant, Category } = require('../models')

const restaurantController = {

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category,
      // 若沒有加入 nest: true &raw: true，則會回傳 Sequelize 物件,後面需要用restaurant.toJSON()轉換成JSON格式
      nest: true
    }).then(restaurant => {
      if (!restaurant) throw new Error('Restaurant not found!')
      return restaurant.increment('viewCount')
    }).then(restaurant => {
      res.render('restaurant', { restaurant: restaurant.toJSON() })
    })
  },

  getRestaurants: (req, res, next) => {
    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1 // 一開始沒有點選頁碼，預設為1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預留可以給使用者自訂每頁顯示餐廳數量
    const offset = getOffset(limit, page) // pagination-helper.js的getOffset函式計算offset

    const categoryId = Number(req.query.categoryId) || ''
    return Promise.all([
      Restaurant.findAndCountAll({ // 返回一個物件，包含rows(查詢結果)和count(總數)
        include: Category,
        where: {
          ...categoryId ? { categoryId } : {} // 檢查 categoryId 是否為空值
        },
        raw: true,
        nest: true,
        limit,
        offset
      }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurants, categories]) => {
        const data = restaurants.rows.map(r => ({
          ...r,
          description: r.description.substring(0, 50)
        }))
        return res.render('restaurants', {
          restaurants: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, restaurants.count)
        })
      })
      .catch(err => next(err))
      /* const where = {}
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
        console.log(restaurant)
        if (!restaurant) throw new Error("Dashboard didn't exist!")
        res.render('dashboard', { restaurant })
      })
  }
}

module.exports = restaurantController
