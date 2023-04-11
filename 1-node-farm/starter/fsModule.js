const fs = require("fs");

//? Blocking, synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

//? Non-blocking, asynchronous way

//* readFile function: ilk parametre: okunacak file'in path'i, ikinci parametre: utf kodu. ucuncu parametre: callback function. (err, data) parametresi alan.
//* okunacak file hazir olduktan sonra callback function'i calistirir.

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

//* writeFile function 4 parametre aliyor: 1: yazdiralacak file'in pathi. 2: ne yazdirilacagi. 3: utf kodu. 4: callback function. (sadece err parametresi)

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR! 🥸");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
        console.log("Your file has been written! 👍");
      });
    });
  });
});

console.log("will read file");
