// Allows you to print an object to the page as JSON.
// {{toJson someObj}}
module.exports = obj => JSON.stringify(obj, null, 3);
