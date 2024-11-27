const passUserToView = (req, res, next) => {
  // locals means that it will always be available to all the pages (ejs)
  res.locals.user = req.session.user ? req.session.user : null
  next()
}

module.exports = passUserToView
