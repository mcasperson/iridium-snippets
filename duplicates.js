var path = require('path');
var fs = require('fs');

var dirPath = path.join(__dirname, 'snippets');

var regex = /'.*?':/g;

var matches = [];

fs.readdirSync(dirPath).forEach(function (file) {
    var contents = fs.readFileSync(dirPath + "/" + file, "utf8");
    do {
        m = regex.exec(contents);
        if (m) {
            matches.push(m[0]);
        }
    } while (m);
});

for (var i = 0; i < matches.length; ++i) {
    for (var j = i + 1; j < matches.length; ++j) {
        if (matches[i] !== "'body':" &&
            matches[i] !== "'prefix':" &&
            matches[i] !== "'.source.feature':" ) {
            if (matches[i] === matches[j]) {
                console.log(matches[i]);
            }
        }
    }
}