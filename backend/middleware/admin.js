// Grant access to specific roles
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'User role is not authorized to access this route'
    });
  }
};

module.exports = admin; 