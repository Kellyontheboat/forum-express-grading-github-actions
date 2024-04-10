const { Comment, User, Restaurant } = require('../models')

const commentController = {
  postComment: (req, res) => {
    const { text, restaurantId } = req.body
    const { id: userId } = req.user

    if (!text) throw new Error('comment should not be empty')

    Promise.all([
      User.findByPk(userId),
      Restaurant.findByPk(restaurantId)
    ])
      .then(([user, restaurant]) => {
        if (!user) throw new Error('user not found')
        if (!restaurant) throw new Error('restaurant not found')
        return Comment.create({
          text,
          userId,
          restaurantId
        })
      })
      .then(() => {
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(err => console.error(err))

    return Comment.create({
      text,
      userId,
      restaurantId
    })
      .then(() => {
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(err => console.error(err))
  }
}

module.exports = commentController
