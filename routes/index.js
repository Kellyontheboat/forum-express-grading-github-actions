const express = require('express')
const router = express.Router()

// *新增，載入 controller
const restController = require('../controllers/restaurant-controller')

router.get('/restaurants', restController.getRestaurants)
router.use('/', (req, res) => res.redirect('/restaurants')) // *設定 fallback 路由

module.exports = router
