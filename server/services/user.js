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

/*Returns information of the user who wants to update his/her profile*/
const getUser = async (email) => {
  const user = await User.findOne({ email: email })
  return user;
}

/*Update password 
const passwordAuthenticate = async (email, currentPassword, newPassword, confirmPassword) => {

  const user = await User.findOne({ email: email });
  const errors = new Array();

  try {
    const checkCurrent = await user.validPassword(currentPassword);
    console.log("2");

    if (checkCurrent) {

      if (newPassword === confirmPassword) {
        console.log("3");

        //await user.setPassword(newPassword);
        const passwordToBeSet = confirmPassword;

        console.log("3.1");
        const user = await User.updateOne(
          { email: email },
          { $set: { password: await this.setPassword(passwordToBeSet) } }
        )
        console.log("4");

        const savedUser = await user.save();
        if (savedUser) {
          console.log("Saved");
          console.log(savedUser);
          console.log(user);
          return user;
        }
      }
      else {
        errors.push("The passwords do not match");
      }
    }
    else {
      errors.push("The current password is invalid");
    }
    return errors;
  }
  catch (error) {
    console.log(error);
  }

}

*/

/*Edit details of the user*/
const editFunction = async (email, firstname, lastname, matric, program, graduationYear) => {

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { firstname: firstname, lastname: lastname, matricNumber: matric, program: program, graduationYear: graduationYear } }
    );

    const savedUser = await user.save();

    if (savedUser) {
      console.log("Saved");
      console.log(user);
      return [true, "Update successful"];
    }
  }

  catch (error) {
    console.log(error);
  }

}


module.exports = {
  create,
  authenticate,
  getById,
  getAll,
  getUser,
  editFunction
};
