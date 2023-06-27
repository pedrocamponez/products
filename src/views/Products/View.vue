<template>
  <div>
    <h1 class="text-center">Essa é a página de produtos</h1>
    <div class="search-container p-3">
      <input type="text" v-model="searchQuery" placeholder="Search Product" class="search-text">
      <button class="btn btn-outline-success search-button" @click="searchProduct">Pesquisar</button>
    </div>
    <div class="card-container p-3 text-center">
      <div v-for="product in filteredProducts" :key="product.id" class="card">
        <h3>{{ product.name }}</h3>
        <p>Price: {{ product.price }}</p>
        <button class="delete-button" @click="deleteProduct(product.id)">X</button>
      </div>
    </div>
    <form @submit.prevent="addProduct">
      <div class="container text-center">
        <div class="row">
          <div class="col">
              <input type="text" v-model="newProduct.name" placeholder="Nome Produto" class="product-name" required>
          </div>
          <div class="col">
              <input type="number" v-model="newProduct.price" placeholder="Preço Produto" class="product-price" required>
          </div>
          <div class="col">
              <button class="btn btn-outline-success submit-product" type="submit">Add Produto</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      newProduct: { name: '', price: null },
      searchQuery: ''
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
          this.products = data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    addProduct() {
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newProduct)
      })
        .then(() => {
          this.fetchProducts();
          this.newProduct.name = '';
          this.newProduct.price = null;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    searchProduct() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    },
    deleteProduct(productId) {
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.fetchProducts();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  },
  computed: {
    filteredProducts() {
      if (this.searchQuery === '') {
        return this.products;
      }
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  position: relative;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
}

.search-container {
  margin-bottom: 20px;
}
</style>