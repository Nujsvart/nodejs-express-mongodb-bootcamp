const http = require("http");
const url = require("url"); //? URL module.

//* createServer function ile server olusturulur. req ve res paremetresi alir. request geldiginde res.end() ile server'dan yanit doner.

const server = http.createServer((req, res) => {
  // console.log(req.url); //* her res geldiginde hangi url'de oldugunu gosterir.

  //? Buyuk projelerde routing islemi zor olabilir. Bu yuzden routing islemi icin genelde Express kullanilir.

  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello from OVERVIEW!");
  } else if (pathName === "/product") {
    res.end("Hello from PRODUCT!");
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
