const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

exports.createProduct = (req, res) => {
  const data = req.body;
  products.push(data);
  res.json(data);
};

exports.replaceProduct = (req, res) => {
  const productId = +req.params.id;
  const data = req.body;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  products.splice(findProductIdx, 1, { ...data, id: productId });
  res.json(data);
};

exports.updateProduct = (req, res) => {
  const productId = +req.params.id;
  const data = req.body;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  products.splice(findProductIdx, 1, { ...products[findProductIdx], ...data });
  res.json(data);
};

exports.getAllProduct = (req, res) => {
  res.json(products);
};

exports.getproductByID = (req, res) => {
  const productId = +req.params.id;
  const findProduct = products.find((item) => item.id === productId);
  res.json(findProduct);
};

exports.deleteProductById = (req, res) => {
  const productId = +req.params.id;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  const showProduct = products[findProductIdx];
  products.splice(findProductIdx, 1);
  res.json(showProduct);
};
