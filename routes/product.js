
const express = require("express");
const productController = require("../controller/product");

const router = express.Router();

router
.post("/product", productController.createProduct)
.put("/product/:id", productController.replaceProduct)
.patch("/product/:id", productController.updateProduct)
.get("/product", productController.getAllProduct)
.get("/product/:id", productController.getproductByID)
.delete("/product/:id", productController.deleteProductById);

exports.router = router;