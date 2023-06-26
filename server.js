const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const data = {
  products: [
    { id: 1, name: 'Telefone', price: 500 },
    { id: 2, name: 'Computador', price: 1200 },
    { id: 3, name: 'iPad', price: 800 }
  ]
};

fs.writeFileSync('sql-database.json', JSON.stringify(data));

const readDatabase = () => {
  const jsonData = fs.readFileSync('sql-database.json', 'utf8');
  return JSON.parse(jsonData);
};

app.get('/products', (req, res) => {
  const database = readDatabase();
  res.json(database.products);
});

app.post('/products', (req, res) => {
  const database = readDatabase();
  const newProduct = { id: 4, name: 'Fone de Ouvido', price: 100 };
  database.products.push(newProduct);
  fs.writeFileSync('sql-database.json', JSON.stringify(database));
  res.sendStatus(200);
});

app.put('/products/:id', (req, res) => {
  const database = readDatabase();
  const productId = parseInt(req.params.id);
  const product = database.products.find(prod => prod.id === productId);
  if (product) {
    product.name = 'Nome do novo produto';
    fs.writeFileSync('sql-database.json', JSON.stringify(database));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/products/:id', (req, res) => {
  const database = readDatabase();
  const productId = parseInt(req.params.id);
  const productIndex = database.products.findIndex(prod => prod.id === productId);
  if (productIndex !== -1) {
    database.products.splice(productIndex, 1);
    fs.writeFileSync('sql-database.json', JSON.stringify(database));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
