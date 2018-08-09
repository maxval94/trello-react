const merge = require("lodash.merge");
const User = require("./user.model").User;

const createUser = (root, { input }, { login }) => {
  const { email, password } = input;
  const user = new User({ email });

  return new Promise((resolve, reject) => {
    return User.register(user, password, err => {
      if (err) {
        reject(err);
      } else {
        login(user, () => resolve(user));
      }
    });
  });
};

const login = (root, { input }, { login, redirect }) => {
  const { email, password } = input;

  console.log("user.resolvers redirect", redirect);

  return new Promise((resolve, reject) => {
    return User.authenticate()(email, password, (err, user) => {
      if (user) {
        login(user, () => resolve(user));
      } else {
        reject("Email / Password Incorrect");
      }
    });
  });
};

const logout = (root, argv, { logout }) => {
  logout();

  return { data: "Success" };
};

const getUser = (root, argv, { user }) => {
  return user;
};

const updateUser = (_, { input }, { user }) => {
  merge(user, input);
  return user.save();
};

const userResolvers = {
  Query: {
    getUser,
    logout
  },
  Mutation: {
    createUser,
    login,
    updateUser
  }
};

module.exports = userResolvers;
