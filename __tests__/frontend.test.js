/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import "regenerator-runtime/runtime";
import Profile from '../views/Profile';
import { getPrograms, getGradYears } from '../server/services/school'
const faker = require('../server/services/faker')

const programList = getPrograms();
const gradYears = getGradYears();
const userData = faker.userData;

describe("Testing the Profile react component", () => {

    it("should render the Profile.jsx component and display the user details", async () => {

        const modifyError = '';
        const success = '';

        render(
            <Profile
                user={userData}
                programList={programList}
                gradYears={gradYears}
                modifyError={modifyError}
                success={success}
            />
        );

        const userNameDiv = document.getElementById("usernameDiv").textContent;
        const emailDiv = document.getElementById("emailId").textContent;
        const matricDiv = document.getElementById("matric").textContent;
        const programDiv = document.getElementById("program").textContent;
        const gradDiv = document.getElementById("grad").textContent;

        expect(matricDiv).toContain(userData.matricNumber);
        expect(emailDiv).toContain(userData.email);
        expect(userNameDiv).toContain(userData.firstname);
        expect(userNameDiv).toContain(userData.lastname);
        expect(programDiv).toContain(userData.program);
        expect(gradDiv).toContain(userData.graduationYear);
    })

})



