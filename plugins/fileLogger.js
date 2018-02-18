/**
 * This plugin just logs the file data to the console for
 * inspection during development.
 */
const fileLogger = (files, metalsmith, done) => {

    console.log('files', files);
    console.log('=======');

    for (let file in files) {

        console.log('processing:', file);
    }

    done();
};

module.exports = fileLogger;
