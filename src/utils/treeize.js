const Treeize = require("treeize");

function treeize(data) {
  // Here, you are ensuring that the data is formatted as an array
  // because the `grow()` method is expecting an array
  const isArray = Array.isArray(data);
  data = isArray ? data : [data];

  try {
    // Create a new instance of Treeize
    const tree = new Treeize();

    // Transform the data into a deep tree structure
    tree.grow(data);

    // If transforming an array of objects, then return an array of transformed objects
    // Otherwise, return just the single transformed object
    return isArray ? tree.getData() : tree.getData()[0];
  } catch (error) {
    return new Error("There is a problem with treeizing the data.");
  }
}

module.exports = treeize;