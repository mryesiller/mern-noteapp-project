const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")

UnauthenticatedError
const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid")
  }
  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }
    next()
  } catch (err) {
    throw new UnauthenticatedError("Authentication Invalid")
  }
}

module.exports = protectedRoute