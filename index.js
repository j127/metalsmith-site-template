const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const tags = require('metalsmith-tags');
const registerHelpers = require('metalsmith-register-helpers');
const watch = require('metalsmith-watch');
const htmlMinifier = require("metalsmith-html-minifier");
const drafts = require('metalsmith-drafts');
// TODO: https://github.com/segmentio/metalsmith-metadata
// const metadata = require('metalsmith-metadata');
// const branch = require('metalsmith-branch');

const fileLogger = require('./plugins/fileLogger');
const loadPartials = require('./helpers/partialLoader');

// Import any site-specific settings
const config = require('./config.js');

const fs = require('fs');
const handlebars = require('handlebars');
const sass = require('metalsmith-sass');

loadPartials('./templates/_partials');

Metalsmith(__dirname)
    .metadata({
        // Enable livereload if passed `dev`
        isDevMode: process.argv[2] === 'dev',
        siteName: config.siteName
    })
    .use(fileLogger)
    // The watch module seems to be causing problems with generating new builds on change
    // .use(watch({
    //     paths: {
    //         '${source}/**/*': true,
    //         'templates/**/*': '**/*.md'
    //     },
    //     livereload: true
    // }))
    .use(drafts())
    .use(registerHelpers({
        directory: 'helpers/handlebars'
    }))
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            metadata: {
                isPost: true
            }
        }
    }))
    // .use(tags({
    //     handle: 'categories',
    //     path: 'category/:tag.html',
    //     layout: '/partials/category.hbt'
    // }))
    .use(markdown({
        smartypants: true,  // smart quotes and dashes
        gfm: true,
        tables: true
    }))
    .use(permalinks({
        pattern: ':title',
        linksets: [
            {
                match: { collection: 'pages' },
                pattern: ':title'
            },
            {
                match: { collection: 'posts' },
                pattern: 'blog/:title',
                sortBy: 'date',
                reverse: true
            }
        ]
    }))
    .use(templates('handlebars'))
    .use(sass({
        outputStyle: 'compressed'
    }))
    .destination('./build')
    .use(htmlMinifier({
        // Collapses whitespace and removes comments from HTML
        collapseBooleanAttributes: false,
        removeAttributeQuotes: false,
        removeEmptyAttributes: false,
        removeRedundantAttributes: false
    }))
    .build(err => {
        if (err) {
            throw err;
        }
        console.log('=======');
        console.log('Build finished');
    });
