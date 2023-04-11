const http = require("http");

//* createServer function ile server olusturulur. req ve res paremetresi alir. request geldiginde res.end() ile server'dan yanit doner.

const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

//* olusturudugumuz serveri dinlemek icin .listen() fonksiyonu kullanilir. server'dan request bekler. 3 parametre alir. 1: port, 2: ip adress. 3: callback. (request geldiginde calisir.)

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
