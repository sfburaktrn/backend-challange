const server = require("./api/server");
const { PORT } = require("./config/index");

server.listen(PORT, () => {
  console.log("server working");
});
