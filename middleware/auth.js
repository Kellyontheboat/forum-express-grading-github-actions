const helpers = require('../helpers/auth-helpers')
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  req.flash('error_messages', 'Please sign in.')
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) return next()
    req.flash('error_messages', 'Permission required.')
    return res.redirect('/restaurants')
  } else {
    req.flash('error_messages', 'Please sign in.')
    return res.redirect('/signin')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin
}
