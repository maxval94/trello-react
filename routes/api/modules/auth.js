const User = require("../user/user.model").User;

const auth = passport => (req, res, next) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  next();
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
