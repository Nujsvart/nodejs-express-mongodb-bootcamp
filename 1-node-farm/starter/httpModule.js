const http = require("http");
const fs = require("fs");
const url = require("url"); //? URL module.

//* route'da /api'ye girildiginde datayi her seferinde okumak yerine, top-level code olarak bir kez senkron bir sekilde okutup variable'a kaydederiz. bloklamaz.
//* kaydedilen var'i serverda sadece request geldiginde res.end(data) ile gonderebiliriz.
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
// const dataObj = JSON.parse(data)

//* createServer function ile server olusturulur. req ve res paremetresi alir. request geldiginde res.end() ile server'dan yanit doner.
const server = http.createServer((req, res) => {
  // console.log(req.url); //* her res geldiginde hangi url'de oldugunu gosterir.

  //? Buyuk projelerde routing islemi zor olabilir. Bu yuzden routing islemi icin genelde Express kullanilir.

  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello from OVERVIEW!");
  } else if (pathName === "/product") {
    res.end("Hello from PRODUCT!");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

//* olusturudugumuz serveri dinlemek icin .listen() fonksiyonu kullanilir. server'dan request bekler. 3 parametre alir. 1: port, 2: ip adress. 3: callback. (request geldiginde calisir.)

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
