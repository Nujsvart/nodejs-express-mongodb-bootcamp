const http = require("http");
const fs = require("fs");
const { URL } = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const baseUrl = `http://${req.headers.host}/`;
  const reqURL = new URL(req.url, baseUrl);
  const pathname = reqURL.pathname;
  const params = reqURL.searchParams;
  const query = params.get(`id`);

  console.log(`Base URL: ${baseUrl}`);
  console.log(`reqURL: ${reqURL}`);
  console.log(`pathname: ${pathname}`);
  console.log(`query: ${query}`); //? searchParams null donuyor?

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
