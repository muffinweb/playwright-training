const fs = require("fs");

fs.writeFile('fwritetest.txt', 'hello fwrite test', err => {
    if (err) {
        console.error(err);
    } else {
        console.log('output has been written successfully.');
    }
});