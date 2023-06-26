const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model('Produto', productSchema);

app.get('/products', (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error('Erro ao obter produto:', error);
      res.sendStatus(500);
    });
});

app.post('/products', (req, res) => {
  const newProduct = new Product({ name: 'Fone de Ouvido', price: 100 });
  newProduct.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Erro ao inserir produto:', error);
      res.sendStatus(500);
    });
});

app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndUpdate(productId, { name: 'Nome do novo produto' })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Erro ao atualizar produto:', error);
      res.sendStatus(500);
    });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Erro ao deletar produto:', error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
