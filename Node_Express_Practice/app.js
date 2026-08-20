const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 6000;
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
