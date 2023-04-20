const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("I could not find that file 🥸");

      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write file 😒");
      resolve("success");
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(_ => {
    console.log("Random dog image saved to file!");
  })
  .catch(err => {
    console.log(err);
  });
