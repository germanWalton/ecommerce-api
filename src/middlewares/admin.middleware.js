module.exports = (req, res, next) => {
  if (req.user.isAdmin)
    next()
  else {
    res.status(403).send({ Error:`This operation requires an admin role`})
  }
}

