const fs = require('fs');

// Reading Files Synchronously
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// Writing Files Synchronously
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

// Reading Files Asynchronously
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});

// Writing Files Asynchronously
fs.writeFile('./txt/output.txt', textIn, err => {
    if (err) console.log(err);
});
