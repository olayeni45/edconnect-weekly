class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        if (this.id != null) {
            return this;
        }
        else {
            return null;
        }
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        if (obj[id] != null) {
            return true;
        }
        else {
            return false;
        }
    }

    delete(id) {
        if (obj[id] != null) {
            return true;
        }
        else {
            return false;
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;