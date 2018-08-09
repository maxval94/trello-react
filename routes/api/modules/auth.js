const User = require("../user/user.model").User;

const auth = passport => {
  passport.use(User.createStrategy());

  passport.serializeUser((user, next) => {
    next(null, user.id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
      next(err, user);
    });
  });
};

const apiSecure = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  auth,
  apiSecure
};
