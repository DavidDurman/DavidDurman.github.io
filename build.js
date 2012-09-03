var Handlebars = require('handlebars');
var fs = require('fs');

var layoutTemplate = Handlebars.compile(fs.readFileSync('./layout.html').toString());

// Remove all old generated pages, files with .html in them except of layout.html.

var oldPages = fs.readdirSync('./');
oldPages.forEach(function(oldPage) {

    if (oldPage.indexOf('.html') === -1 || oldPage === 'layout.html') return;

    fs.unlinkSync(oldPage);
    
});

// Generate new pages in the current directory.

var posts = fs.readdirSync('./posts');

posts.forEach(function(pageFile) {
    
    if (pageFile === '.' || pageFile === '..') return;

    var pageTemplate = Handlebars.compile(fs.readFileSync('./posts/' + pageFile).toString());
    var pageHTML = layoutTemplate({ body: pageTemplate() });

    fs.writeFileSync(pageFile, pageHTML);
});

