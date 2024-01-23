const fs = require("fs");


console.log("1")

// Non-Blocking I/O
fs.readFile("file.txt", (err, data) => {console.log("File: "+data.toString())})

// Immediately Executed
console.log("2")


// Output
// 1
// 2
// File: lorem ipsum
