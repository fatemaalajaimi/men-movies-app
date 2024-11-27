const isSignedIn = (req, res, next) => {
  if (req.session.user) return next()
  //This is like the else part
  res.redirect('auth/sign-in')
}

module.exports = isSignedIn
