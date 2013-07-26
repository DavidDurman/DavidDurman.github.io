var fs = require('fs');
var exec = require('child_process').exec;

fs.watch('posts/', { persistent: true }, function(event, filename) {

    exec('node build.js', function(err, stdout, stderr) {

        if (err) {
            console.log('Error: ', err);
        } else {
            console.log('Successfully  built.');
        }
        console.log(stdout);
        console.log(stderr);
    });
});