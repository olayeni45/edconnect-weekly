//Import statements
const Project = require('../models/project');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {

  try {
    //Create a new project
    const project = new Project(
      {
        name,
        abstract,
        authors,
        tags,
        createdBy
      }
    );

    const savedProject = await project.save();

    if (savedProject) {
      return [true, project]
    }
  }

  catch (error) {
    return [false, helper.translateError(error)];
  }

};

/* Return project with specified id */
const getById = async (id) => {
  const project = await Project.findOne({ _id: id });

  return project;
};
/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  const projects = await Project.find();
  return projects.reverse();
};

module.exports = {
  getAll,
  create,
  getById
};
