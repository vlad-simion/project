<template>
   <div class="popup">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Back </button>
         </small>
        </h4>

        <div class="col-md-12 form-wrapper">
          <h2> Edit Product </h2>
          <form id="create-post-form" @submit.prevent="editProduct">
            <div class="form-group col-md-12">
            <label for="title"> Name </label>
            <input type="text" id="name" v-model="product.name" name="title" class="form-control" placeholder="Enter name">
            </div>

            <div class="form-group col-md-12">
            <label for="title"> Code </label>
            <input type="text" id="code" v-model="product.code" name="title" class="form-control" placeholder="Enter code">
            </div>

            <div class="form-group col-md-12">
              <label for="title"> Weight </label>
              <input type="text" id="weight" v-model="product.weight" name="title" class="form-control" placeholder="Enter weight">
            </div>

            <div class="form-group col-md-12">
                <label for="title"> Price </label>
                <input type="text" id="price" v-model="product.price" name="title" class="form-control" placeholder="Enter price">
            </div>

            <div class="form-group col-md-12">
                <label for="title"> Color </label>
                <input type="text" id="color" v-model="product.color" name="title" class="form-control" placeholder="Enter color">
            </div>

            <div class="form-group col-md-4 pull-right">
                <button class="btn btn-success" type="submit"> Edit Product </button>
            </div>          
          </form>
        </div>
    </div>
</template>

<style>
.popup{
    margin:0px auto 0px auto;
    left:0;
    right:0;
    width:400px;
    background:white;
    border:solid 3px black;
    }
</style>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      product: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct();
  },
  methods: {
  fetchProducts() {
      axios
        .get(`${server.baseURL}/product/products`)
        .then(data => (this.products = data.data));
    },
    editProduct() {
      let productData = {
        name: this.product.name,
        code: this.product.code,
        weight: this.product.wight,
        price: this.product.price,
        color: this.product.color,
        isDeleted: "false"
      };

      axios
        .put(
          `${server.baseURL}/product/update?productID=${this.id}`,
          productData
        )
        .then(
          router.push({ name: "produse" })
        )
    },
    getProduct() {
      axios
        .get(`${server.baseURL}/product/product/${this.id}`)
        .then(data => (this.product = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

