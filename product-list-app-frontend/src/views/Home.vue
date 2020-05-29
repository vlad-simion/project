<template>
    
    <div class="container-fluid">
    <div class="modal-fade">
                <router-view></router-view>
    </div>
      <!-- <div class="row"> -->
        <div class="">
            <table class="table table-dark">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" @click="sort('name')">Name</th>
                  <th scope="col" @click="sort('code')">Code</th>
                  <th scope="col" @click="sort('weight')">Weight</th>
                  <th scope="col" @click="sort('price')">Price</th>
                  <th scope="col" @click="sort('color')">Color</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in sortedproducts" :key="product._id">
                  <td>{{ product.name }}</td>
                  <td>{{ product.code }}</td>
                  <td>{{ product.weight }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.color }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                 <router-link :to="{name: 'Edit', params: {id: product._id}}" class="btn btn-sm btn-outline-secondary" tag="div">Edit Product </router-link>
                                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteProduct(product._id)">Delete Product</button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
  <button @click="prevPage">Previous</button> 
  <button @click="nextPage">Next</button>
  </p>
  Page: {{currentPage}}
          </div>
      <!-- </div> -->
    </div>
</template>
<style>
  .modal-fade{
    position:absolute;
    width:100%;
    z-index:1;
  }

  thead th{
    cursor:pointer;
  }

  tbody td{
    width:90px;
  }
</style>
<script>
import { server } from "../helper";
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:3,
      currentPage:1
    };
  },
  computed: {
     activeProducts: function() {
       return this.products.filter(function(u) {
         return u.isDeleted != true
        })
      },
      sortedproducts:function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.activeProducts.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
  sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.activeProducts.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    fetchProducts() {
      axios
        .get(`${server.baseURL}/product/products`)
        .then(data => (this.products = data.data));
    },

    deleteProduct(id) {
    let productData = {
        isDeleted: "true"
      };
      axios
      .put(
          `${server.baseURL}/product/update?productID=${id}`,
          productData
      ).then(
         this.fetchProducts()
      )
    }
  },
  beforeUpdate(){
    this.fetchProducts()
  }
};
</script>

