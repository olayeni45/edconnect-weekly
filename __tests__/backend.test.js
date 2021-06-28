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
        const firstname = "Changed";
        const lastname = "Lastname";
        const matricNumber = "00/0000";
        const program = "Computer Technology";
        const graduationYear = "2030";
        const image = "Changed Picture";
        const url = "http://changed/changedPicture.jpg";

        const changedDetails = await userService.editFunction(userData.email, firstname, lastname, matricNumber, program, graduationYear, image, url)
        expect(changedDetails[0]).toBe(true);

        const newUser = await userModel.findOne({ email: userData.email });
        expect(newUser.firstname).toBe("Changed");
        expect(newUser.lastname).toBe("Lastname");
        expect(newUser.matricNumber).toBe("00/0000");
        expect(newUser.program).toBe("Computer Technology");
        expect(newUser.graduationYear).toBe("2030");
        expect(newUser.image).toBe("Changed Picture");

    })


})

// //Second test
describe("Testing the reset Password route", () => {

    it("should successfully update password and login", async () => {

        const resp = request(app)
            .post('/resetPassword')
            .send({
                email: userData.email,
                newPassword: "EdConnectWeekly",
                confirmPassword: "EdConnectWeekly"
            })
            .expect(303)

        const response = request(app)
            .post('/login')
            .send({
                email: userData.email,
                password: "EdConnectWeekly"
            })
            .expect(303)

        const modifyPassword = await userService.authenticate(userData.email, userData.password);
        expect(modifyPassword[0]).toBe(true);

        await userModel.findOneAndDelete({ email: userData.email });

    })

})

