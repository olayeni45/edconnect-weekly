const faker = require('faker');
import { getPrograms, getGradYears } from '../services/school'
const programList = getPrograms();
const gradYears = getGradYears();

//Random User Data
const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email();
const year = faker.datatype.number({
    'min': 10,
    'max': 21
});
const num = faker.datatype.number({
    'min': 1000,
    'max': 9999
});
const matricNumber = year + "/" + num;
const id = faker.datatype.uuid()
const program = faker.random.arrayElement(programList);
const graduationYear = faker.random.arrayElement(gradYears);
const password = "VerySecret";
const image = faker.random.word() + ".jpg";
const url = faker.internet.url() + "/" + image;

const userData = {
    id: id,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    matricNumber: matricNumber,
    program: program,
    graduationYear: graduationYear,
    image: image,
    url: url
}

module.exports = {
    userData
}

