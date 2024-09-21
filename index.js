const express = require("express");
const server = express();
const productRouter = require('./routes/product')


// body parser
server.use(express.json());
server.use('/apiV1', productRouter.router);


server.listen(8080, () => {
  console.log("server started");
});
