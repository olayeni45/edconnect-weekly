const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {

    }
}

class Projects extends DataModel {
    validate(obj) {
        //Validating if Authors and tag properties are arrays
        if (typeof this.authors === "object" && typeof this.tags === "object") {
            if (this.id != null && this.name != null && this.abstract != null && this.authors != null && this.tags != null && this.createdBy != null) {
                return true;
            }
        }

        else {
            return false;
        }
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};