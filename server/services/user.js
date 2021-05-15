const User = require('../models/user');
const helper = require('../models/mongo_helper');
/* Creates new user */
const create = async ({ firstname, lastname, email, password, matricNumber, program, graduationYear }) => {
  try {
    //create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      matricNumber,
      program,
      graduationYear
    });
    user.setPassword(password);

    const savedUser = await user.save();

    if (savedUser) {
      console.log("Saved");
      return [true, user];
    }
  }
  catch (error) {
    return [false, helper.translateError(error)];
  }
}

/* Authenticate a user */
const authenticate = async (email, password) => {

  const user = await User.findOne({ email: email });

  if (user != null) {
    console.log("1");

    try {
      const authenticated = await user.validPassword(password);
      if (authenticated) {
        console.log(user);
        return [true, user];
      }
      else {
        return [false, ["Invalid email/password"]]
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  else {
    return [false, ["Invalid email/password"]]
  }


}


/* Return user with specified id */
const getById = async (id) => {
  const user = await User.findOne({ _id: id })
  return user;
};

/* Return all users */
const getAll = async () => {
  const user = await User.find();

  return user;
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};
