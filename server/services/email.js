const userModel = require('../models/user');
const mailjet = require('node-mailjet')
    .connect(process.env.MAILJET_FIRST, process.env.MAILJET_SECOND);

//Reset password link using email
const resetLink = async (email) => {

    try {

        const user = await userModel.findOne({ email: email });

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
                  <a href="http://localhost/resetPassword">Password Reset Link</a>
                  <br />  <br />
                  <small>Olayeni from EdConnect!</small>`,
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })

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

module.exports = {
    resetLink
}
