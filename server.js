const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Application listen on ${process.env.HOST}:${process.env.PORT}`);
});
