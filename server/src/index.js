const app = require("./app.js");
const port = 4000;
const server = app.default.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});

exports.default = server;