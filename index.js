const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const express = require('express');
const server = express();

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

server.get('/product/:id', (req, res) => {
  console.log(req.params);
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