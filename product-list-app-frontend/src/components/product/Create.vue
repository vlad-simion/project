<template>
   <div class="popup">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Back </button>
         </small>
        </h4>
        <div class="col-md-12 form-wrapper">
          <h2> Create Product </h2>
          <form id="create-post-form" @submit.prevent="createProduct">
              <div class="form-group col-md-12">
              <label for="title"> Name </label>
              <input type="text" id="name" v-model="name" name="title" class="form-control" placeholder="Name">
              </div>

              <div class="form-group col-md-12">
              <label for="title"> Code </label>
              <input type="text" id="code" v-model="code" name="title" class="form-control" placeholder="Code">
              </div>

              <div class="form-group col-md-12">
                  <label for="title"> Email </label>
                  <input type="text" id="weight" v-model="weight" name="title" class="form-control" placeholder="Enter weight">
              </div>

              <div class="form-group col-md-12">
                  <label for="title"> Phone </label>
                  <input type="text" id="price" v-model="price" name="title" class="form-control" placeholder="Enter Price">
              </div>

              <div class="form-group col-md-12">
                  <label for="title"> color </label>
                  <input type="text" id="color" v-model="color" name="title" class="form-control" placeholder="Enter color">
              </div>

              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create Product </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      code: "",
      weight: "",
      price: "",
      color: "",
      isDeleted:""
    };
  },
  methods: {
    createProduct() {
      let productData = {
        name: this.name,
        code: this.code,
        weight: this.weight,
        price: this.price,
        color: this.color,
        isDeleted: "false"
      };
      this.__submitToServer(productData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/product/create`, data).then(
        router.push({ name: "produse" })
      );
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

