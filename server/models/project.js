//Importing mongoose,mongoose schema and crypto
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Creating the Project Schema and model
const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        abstract: { type: String, required: true },
        authors: { type: [String], required: true, unique: true },
        tags: { type: [String], required: false },
        createdBy: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
)

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;
