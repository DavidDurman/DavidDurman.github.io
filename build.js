var Handlebars = require('handlebars');
var fs = require('fs');
var _ = require('underscore');

var POSTS_DIR = './posts/';
var TARGET_DIR = './';

var layoutTemplate = Handlebars.compile(fs.readFileSync('./layout.html').toString());

// Remove all old generated pages, files with .html in them except of layout.html.

var oldPages = fs.readdirSync(TARGET_DIR);
oldPages.forEach(function(oldPage) {

    if (oldPage.indexOf('.html') === -1 || oldPage === 'layout.html') return;

    fs.unlinkSync(TARGET_DIR + oldPage);
    
});

// Generate new pages in the current directory.

var posts = fs.readdirSync(POSTS_DIR);

posts.forEach(function(pageFile) {
    
    if (pageFile === '.' || pageFile === '..') return;

    var isIndex = pageFile === 'index.html';

    var pageDocument = fs.readFileSync(POSTS_DIR + pageFile).toString();
    var page = parsePageDocument(pageDocument);
    
    var pageTemplate = Handlebars.compile(page.body);
    var pageHTML = layoutTemplate(_.extend({ body: pageTemplate() }, page.header));

    // Place generated index.html to the root directory as opposed to other posts that
    // are put to the `TARGET_DIR`.
    fs.writeFileSync(isIndex ? pageFile : TARGET_DIR + pageFile, pageHTML);
});

function parsePageDocument(pageDocument) {
    
    // Page template can be a combination of JSON object that must have its first `{` bracket
    // as the first character of the template and HTML. If the JSON object is present, its
    // considered a hash table of variables, usually containing `title`, `keywords` and `description`
    // specific to that page.

    var page = {
        
        header: {},
        body: pageDocument
    };

    if (pageDocument[0] === '{') {
        
        var headerDelimiterIdx = pageDocument.indexOf('}')
        
        if (headerDelimiterIdx === -1) {
            throw new Error('Wrong header syntax. Header is a JSON object.');
        }

        var headerString = pageDocument.substr(0, headerDelimiterIdx + 1);
        
        try {
            
            page.header = JSON.parse(headerString);
            
        } catch (err) {
            
            console.error('Error parsing page header: ', err, '\n', headerString);
        }
        
        page.body = pageDocument.substr(headerDelimiterIdx + 1);
    }

    return page;
}
