const User = require('../models/user');
const helper = require('../models/mongo_helper');

/* Creates new user */
const create = async ({ firstname, lastname, email, password, matricNumber, program, graduationYear, image, url }) => {
  try {
    //create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      matricNumber,
      program,
      graduationYear,
      image,
      url
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

/*Edit details of the user*/
const editFunction = async (email, firstname, lastname, matric, program, graduationYear, imageName, imageUrl) => {

  try {
    if (imageName == "") {
      const imageDB = await User.findOne({ email: email }).image;
      imageName = imageDB;
    }
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { firstname: firstname, lastname: lastname, matricNumber: matric, program: program, graduationYear: graduationYear, image: imageName, url: imageUrl } },
      { useFindAndModify: false }
    );

    const savedUser = await user.save();

    if (savedUser) {
      console.log("Saved");

      return [true, "Update successful"];
    }
    else {
      console.log("Error occured");
      return [false, "An error has occured, please try again."];
    }
  }

  catch (error) {
    console.log(error);
  }

}

//Get default image name and url
const getDefault = async (email) => {
  const user = await User.findOne({ email: email });
  const image = user.image;
  const url = user.url;
  const details = [image, url];
  return details;
}

//Update password 
const passwordChange = async (email, currentPassword, newPassword, confirmPassword) => {

  var user = await User.findOne({ email: email });

  try {
    const checkCurrent = await user.validPassword(currentPassword);

    if (checkCurrent) {

      if (newPassword === confirmPassword) {
        const userChange = await User.findOne({ email: email });
        const passwordChanges = await userChange.updatePassword(confirmPassword);
        const salt = passwordChanges[0];
        const passwd = passwordChanges[1];

        if (passwd == undefined) {
          console.log("Undefined password");
        }
        else {
          var user = await User.findOneAndUpdate(
            { email: email },
            { $set: { salt: salt, password: passwd } }
          )


          const savedUser = await user.save();
          if (savedUser) {
            console.log("Saved");
            return [true, "Password Updated"];
          }
        }
      }
      else {
        return [false, "The passwords do not match"];
      }

    }
    else {
      return [false, "The current password is invalid"];
    }
  }
  catch (error) {
    console.log(error);
  }

}

//Reset password from db
const resetPasswordDB = async (email, newPassword, confirmPassword) => {

  try {
    var user = await User.findOne({ email: email });

    if (user) {

      if (newPassword === confirmPassword) {
        const userChange = await User.findOne({ email: email });
        const passwordChanges = await userChange.updatePassword(confirmPassword);
        const salt = passwordChanges[0];
        const passwd = passwordChanges[1];

        if (passwd == undefined) {
          console.log("Undefined password");
        }
        else {
          user = await User.findOneAndUpdate(
            { email: email },
            { $set: { salt: salt, password: passwd } }
          )


          const savedUser = await user.save();
          if (savedUser) {
            console.log("Saved");
            return [true, "New Password set, You can now login."];
          }
        }
      }
      else {
        return [false, "The passwords do not match"];
      }

    }
    else {
      return [false, "Email not found"];
    }
  }

  catch (error) {
    console.log(error);
  }

}


//Creates a new user from google and facebook and sets password
const googleCreate = async (firstname, lastname, email, matricNumber, program, graduationYear, password, confirmPassword, image, url) => {

  try {
    //create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      matricNumber,
      program,
      graduationYear,
      image,
      url
    });

    if (password === confirmPassword) {
      user.setPassword(password);

      const savedUser = await user.save();
      if (savedUser) {
        console.log("Saved");
        return [true, user];
      }
    }

    else {
      return [false, "Passwords do not match"]
    }

  }
  catch (error) {
    return [false, helper.translateError(error)];
  }
}

//Login with facebook and google
const socialLogin = async (email) => {

  const user = await User.findOne({ email: email });
  if (user != null) {

    try {
      console.log(user);
      return [true, user];
    }
    catch (error) {
      console.log(error);
    }
  }

  else {
    return [false, ["Account not found. Kindly Signup to gain access."]]
  }

}


//URL for Google Callbacks and Email API
const url = async () => {

}

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
  getUser,
  editFunction,
  passwordChange,
  resetPasswordDB,
  getDefault,
  googleCreate,
  socialLogin,
};
