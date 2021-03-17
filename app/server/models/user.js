//Importing mongoose,mongoose schema and crypto
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
//Creating the UserSchema and model
const UserSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        matricNumber: { type: String, required: true },
        program: { type: String, required: false },
        graduationYear: { type: String, required: true }
    },
    { timestamps: true }
)

//Generating random salt and hash
const salt = crypto.randomBytes(16).toString('hex');
const hash = (password, salt) => {
    crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};
//Methods of the UserSchema
UserSchema.methods.setPassword = function (password) {
    console.log("Password", password);
    if (password.length >= 7) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
        //this.password = hash(password, this.salt);
        console.log("If password", password);
        console.log("This password", this.password);
    }
    else {
        throw new Error("Password should have at least 7 characters")
    }
}

UserSchema.methods.validPassword = function (password) {
    return this.password === crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    //return this.password === hash(password, this.salt);
}

//Mongoose User model
const User = mongoose.model("users", UserSchema);

module.exports = User;