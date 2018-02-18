const fs = require('fs');
const handlebars = require('handlebars');

// This function automatically registers the partials in the given
// directory that have a `.hbt` extension.
module.exports = function (partialsDirectory) {
    fs.readdir(partialsDirectory, (err, items) => {
        // Look for files in the _partials directory that end with an `.hbt`
        // extension and register them as partials.
        const pattern = /(.+)\.hbt$/;

        items.forEach(item => {
            if (pattern.test(item)) {
                console.log('Loading partial template:', item);
                // handlebars.registerPartial(partialName, templateString)
                handlebars.registerPartial(item.slice(0, -4), fs.readFileSync(__dirname + `/../${partialsDirectory}/${item}`).toString());
            }
        });

    });
};
