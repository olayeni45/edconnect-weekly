/**
 * @jest-environment node
 */
require("dotenv").config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/serverTest');
const faker = require('../server/services/faker');
import "regenerator-runtime/runtime";
const userService = require('../server/services/user');
const userModel = require('../server/models/user');
jest.setTimeout(90000);

const userData = faker.userData;
//Connecting to the mongodb memory server
beforeAll(async () => {
    await mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
        (err) => {
            if (err) {
                console.log("Error connecting to db: ", err);
            } else {
                console.log("Connected to MongoDB");
            }
        }
    );

})

//Disconnecting from the mongodb memory server
afterAll(async () => {
    await mongoose.disconnect();
});


//First Test
describe('Testing the create function and the edit function from User Service', () => {

    it('should create a user with random data and modify the details of the user ', async () => {

        const createdUser = await userService.create(userData);
        expect(createdUser[0]).toBe(true);

        //act
        const resp = request(app)
            .put('/profileUser')
            .send({
                email: "Changed@changed.com",
                firstname: "Changed",
                lastname: "Lastname",
                matricNumber: "00/0000",
                program: "Computer Technology",
                graduationYear: "2030",
                image: "Changed Picture",
                url: "http://changed/changedPicture.jpg"
            })

        const data = await userModel.findOne({ email: "Changed@changed.com" })
        console.log("DATA", data);



    })


})

// //Second test
describe("Testing the reset Password route", () => {

    it("should successfully update password and login", async () => {

        const before = await userModel.findOne({ email: userData.email })
        console.log("before changing password", before);

        const resp = request(app)
            .post('/resetPassword')
            .send({
                email: userData.email,
                newPassword: "EdConnectWeekly",
                confirmPassword: "EdConnectWeekly"
            })
            .expect(200)

        const response = request(app)
            .post('/login')
            .send({
                email: userData.email,
                password: "EdConnectWeekly"
            })
            .expect(200)

        const after = await userModel.findOne({ email: userData.email })
        console.log("after changing password", after);

        const modifyPassword = await userService.authenticate(userData.email, userData.password);
        console.log(modifyPassword);
        expect(modifyPassword[0]).toBe(true);

        await userModel.findOneAndDelete({ email: userData.email });

    })

})

//Third test
describe("It should not display the Page containing the data from Google or Facebook Authentication", () => {

    it("should throw error", async () => {
        const resp = request(app)
            .get('/Social')
            .expect(404)

    })

})