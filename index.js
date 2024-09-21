const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const express = require('express');
const server = express();

// Inbuild middleware -> to get info from body
server.use(express.json())

// Custom middleware -> logger - on server level
server.use((req, res, next) => {
  console.log(req.method, req.ip, req.hostname);
  console.log(req.get('User-Agent'));
  next()
})

// middleware -> route level
const auth = ((req, res, next) => {
  console.log('req.query.password ::: ', req.query.password)
  if(req.query.password == '123') {
    next();
  } else {
    res.sendStatus(401);
  }
})

// API -> endPoints

// REST API 
// C U R D API

// Create
server.post('/product', (req, res) => {
  const data = req.body;
  products.push(data);
  res.json(data);
});

//Update
server.put('/product/:id', (req, res) => {
  const productId = +req.params.id;
  const data = req.body;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  products.splice(findProductIdx, 1, {...data, id: productId});
  res.json(data);
});

server.patch('/product/:id', (req, res) => {
  const productId = +req.params.id;
  const data = req.body;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  products.splice(findProductIdx, 1, {...products[findProductIdx], ...data});
  res.json(data);
});


// Read
server.get('/product', (req, res) => {
  res.json(products);
});

server.get('/product/:id', (req, res) => {
  const productId = +req.params.id;
  const findProduct = products.find((item) => item.id === productId);
  res.json(findProduct);
});

//Delete
server.delete('/product/:id', (req, res) => {
  const productId = +req.params.id;
  const findProductIdx = products.findIndex((item) => item.id === productId);
  const showProduct = products[findProductIdx];
  products.splice(findProductIdx, 1);
  res.json(showProduct);
});
  

// --------------------------------------------------------------------------------------
server.get('/', auth, (req, res) => {
  res.json({type: 'GET'})
})

server.get('/', auth, (req, res) => {
  res.json({type: 'GET'})
})

server.post('/', (req, res) => {
  res.json({type: 'POST'})
})

server.put('/', (req, res) => {
  res.json({type: 'PUT'})
})

server.patch('/', (req, res) => {
  res.json({type: 'PATCH'})
})

server.delete('/', (req, res) => {
  res.json({type: 'DELETE'})
})



server.listen(8080, () => {
  console.log('server started')
})