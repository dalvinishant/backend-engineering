const fs = require("fs");


console.log("1")

// Blocking I/O
const file = fs.readFileSync("file.txt")

// Waits untile above line is completed
console.log("File: ", file.toString())
console.log("2")

// Output
// 1
// File:  lorem ipsum
// 2