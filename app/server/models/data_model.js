class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        let i;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }

        return null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let i;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                for (let objectName in obj) {
                    this.data[i][objectName] = obj[objectName];
                }
                return true;
            }
        }

        return false;
    }

    delete(id) {
        let i;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                this.data.splice(i, 1);
                return true;
            }
        }
        return false;

    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;