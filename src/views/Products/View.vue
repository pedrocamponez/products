

<template>
    <main>
        <h1 class="text-center">Essa é a página de produtos</h1>

        <div class="p-3">
            <ul>
                <li class="$blue-100" v-for="product in products" :key="product.id">
                    {{ product.name }} - {{ product.price }}
                </li>
            </ul>
            <form @submit.prevent="addProduct">
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <input type="text" v-model="newProduct.name" placeholder="Nome Produto" required>
                        </div>
                        <div class="col">
                            <input type="number" v-model="newProduct.price" placeholder="Preço Produto" required>
                        </div>
                        <div class="col">
                            <button class="btn btn-outline-success" type="submit">Add Produto</button>
                        </div>
                </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>

export default {
    name: 'products',
  data() {
    return {
      products: [],
      newProduct: { name: '', price: null }
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
    }
  },

};
</script>