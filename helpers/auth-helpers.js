const getUser = req => {
  return req.user || null
}

const ensureAuthenticated = req => {
  return req.isAuthenticated()
  // passport 提供的函式，會回傳 true 或 false
}

module.exports = {
  getUser,
  ensureAuthenticated
}
