const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/restaurants', (req, res) => {
  return adminController.getRestaurants
})

router.use('/', (req, res) => {
  return res.render('admin/restaurants')
})

module.exports = router
