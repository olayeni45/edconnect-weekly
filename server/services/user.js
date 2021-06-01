const User = require('../models/user');
const helper = require('../models/mongo_helper');
const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_FIRST, process.env.MAILJET_SECOND);
const multer = require('multer');

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


/*Edit details of the user*/
const editFunction = async (email, firstname, lastname, matric, program, graduationYear, profilePicture) => {

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { firstname: firstname, lastname: lastname, matricNumber: matric, program: program, graduationYear: graduationYear, image: profilePicture } },
      {useFindAndModify: false}
    );

    const savedUser = await user.save();

    if (savedUser) {
      console.log("Saved");
      console.log(user);
      return [true, "Update successful"];
    }
    else{
      console.log("Error occured");
      return [false, "An error has occured, please try again."];
    }
  }

  catch (error) {
    console.log(error);
  }

}

//Get profile picture
const getPicture = async (email) => {
  const user = await User.findOne({ email: email })
  const image = user.image;
  return image;
}

//Update password 
const passwordChange = async (email, currentPassword, newPassword, confirmPassword) => {

  var user = await User.findOne({ email: email });

  try {
    const checkCurrent = await user.validPassword(currentPassword);
    console.log("2");

    if (checkCurrent) {

      if (newPassword === confirmPassword) {
        const userChange = await User.findOne({ email: email });
        const passwordChanges = await userChange.updatePassword(confirmPassword);
        const salt = passwordChanges[0];
        const passwd = passwordChanges[1];
        console.log("Changed password is", passwd);
        console.log("3");

        if (passwd == undefined) {
          console.log("Undefined password");
        }
        else {
          var user = await User.findOneAndUpdate(
            { email: email },
            { $set: { salt: salt, password: passwd } }
          )
          console.log("4");

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

//Reset password link from token
const resetLink = async (email) => {

  try {
    console.log("1");
    const user = await User.findOne({ email: email });

    if (user) {
      const request = await mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
          "Messages": [
            {
              "From": {
                "Email": "mobolajianney@gmail.com",
                "Name": "Anifowose"
              },
              "To": [
                {
                  "Email": user.email,
                  "Name": user.firstname
                }
              ],
              "Subject": "Password Reset Link",
              "TextPart": "Reset Link Details",
              "HTMLPart": ` <p>Forgot your password? Don't worry it happens!</p>
              <p>To create a new password, click on the link below. </p>
                  <a href="http://localhost/resetPassword">Password Reset Link</a>`,
              "CustomID": "AppGettingStartedTest"
            }
          ]
        })
      /* request
        .then((result) => {
          console.log(result.body)
        })
        .catch((err) => {
          console.log(err.statusCode)
        }) */
      if (request) {
        console.log("4");
        return [true, "An email with instructions for creating a new password has been sent to you."];
      }
      else {
        return [false, "An error occured, please refresh"]
      }

    }
    return [false, "Invalid Email address"];

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
        console.log("Changed password is", passwd);
        console.log("3");

        if (passwd == undefined) {
          console.log("Undefined password");
        }
        else {
          user = await User.findOneAndUpdate(
            { email: email },
            { $set: { salt: salt, password: passwd } }
          )
          console.log("4");

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

//Passport facebook login 
const passportFacebook = async () => {

}


module.exports = {
  create,
  authenticate,
  getById,
  getAll,
  getUser,
  editFunction,
  passwordChange,
  resetLink,
  resetPasswordDB,
  getPicture
};
