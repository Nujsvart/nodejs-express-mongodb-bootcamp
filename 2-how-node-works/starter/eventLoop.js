const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => console.log("Timer 1 finished"), 0); //2
setImmediate(() => console.log("Immediate 1 finished")); //3 (en sonda calisiyor cunku callback icinde degil.)

fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer 2 finished"), 0); //3
  setTimeout(() => console.log("Timer 3 finished"), 3000); //4
  setImmediate(() => console.log("Immediate 2 finished")); //2

  process.nextTick(() => console.log("Process.nextTick")); //1

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level code"); //1
