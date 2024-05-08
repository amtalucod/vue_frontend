<template>
  <div>
    <br /><br /><br />
    <div class="tabs">
      <div
        class="tab"
        @click="activeTab = 'createProduct'"
        :class="{ active: activeTab === 'createProduct' }"
      >
        Create Product
      </div>
      <div
        class="tab"
        @click="activeTab = 'showProducts'"
        :class="{ active: activeTab === 'showProducts' }"
      >
        Show Products
      </div>
    </div>

    <div class="tab-content">
      <div v-show="activeTab === 'createProduct'">
        <!-- Content for Create Product tab -->
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto">
              <div class="card">
                <h5 class="card-header">Create Product</h5>
                <div class="card-body">
                  <div>
                    <label for="category">Select a Category </label>
                    <br />
                    <select id="category" v-model="selectedCategory">
                      <option value="" disabled selected>
                        Select a Category
                      </option>
                      <option
                        v-for="category in allCategories"
                        :key="category.id"
                        :value="category.name"
                      >
                        {{ category.name }}
                      </option>
                    </select>

                    <button
                      @click="showForm = true"
                      class="btn btn-sm btn-secondary"
                    >
                      Add Category
                    </button>

                    <div v-if="showForm">
                      <form @submit.prevent="addCategory">
                        <input
                          type="text"
                          v-model="newCategoryName"
                          placeholder="Enter category name"
                        />
                        <button type="submit">Submit</button>
                        <button type="button" @click="cancelAddCategory">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>

                  <form
                    class="w-1/2 ml-auto mr-auto"
                    @submit.prevent="addProduct"
                  >
                    <br />
                    <div class="field form-group">
                      <label for="name">Product Name</label><br />
                      <input
                        type="text"
                        v-model="name"
                        id="name"
                        name="name"
                        autofocus="true"
                        autocomplete="name"
                        class="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <br />
                    <div class="field form-group">
                      <label for="description">Description</label><br />
                      <input
                        type="description"
                        v-model="description"
                        id="description"
                        name="description"
                        autofocus="true"
                        autocomplete="description"
                        class="form-control"
                        placeholder="Description"
                      />
                    </div>
                    <br />
                    <div class="field form-group">
                      <label for="price">Price</label><br />
                      <input
                        type="price"
                        v-model="price"
                        id="price"
                        name="price"
                        autofocus="true"
                        autocomplete="price"
                        class="form-control"
                        placeholder="Price"
                      />
                    </div>

                    <!-- <div class="field form-group">
                      <label for="type">Product Type</label><br />
                      <select
                        v-model="type"
                        id="type"
                        name="type"
                        class="form-control"
                      >
                        <option value="Physical">Physical</option>
                      </select>
                    </div-->
                    <br />
                    <div class="field form-group">
                      <button
                        id="upload_widget"
                        class="cloudinary-button btn btn-sm btn-secondary"
                      >
                        Upload Photo
                      </button>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-success">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'showProducts'">
        <!-- Content for Show Products tab -->

        <div class="container">
          <div>
            <h1>Your Products</h1>
            <div class="d-flex flex-wrap" style="gap: 40px">
              <div
                v-for="product in allProducts"
                :key="product.id"
                class="card matches-card mb-3"
                style="width: 18rem; min-height: 300px"
              >
                <img
                  :src="product.photo"
                  class="card-img-top"
                  alt="..."
                  style="height: 60%; object-fit: cover"
                />
                <div class="card-body">
                  <h4 class="card-title">{{ product.name }}</h4>
                  <p class="card-text">{{ product.description }}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <h5>Price: {{ product.price }}</h5>
                  </li>
                  <!-- <li class="list-group-item">A second item</li> -->
                </ul>
                <div class="card-body">
                  <button
                    @click="deleteProduct(product.id)"
                    class="btn btn-danger btn-sm"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllProductsQuery,
  createProductMutation,
  deleteProductMutation,
  getAllCategoriesQuery,
  createCategoryMutation,
} from "../graphql";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  name: "AllProducts",
  data() {
    return {
      activeTab: "createProduct",
      //   allProducts: [],
      // for product
      name: "",
      description: "",
      // type: "",
      price: "",
      photo: "",

      // for categories
      allCategories: [],
      newCategoryName: "",
      selectedCategory: "",
      showForm: false,
    };
  },
  apollo: {
    allProducts: {
      query: getAllProductsQuery,
      fetchPolicy: "network-only", // optional, ensures data is always fetched from the server
    },
  },
  methods: {
    // Product
    async addProduct() {
      try {
        console.log("Type should be physical: ", this.name);
        console.log("Type should be physical: ", typeof this.name);
        const response = await this.$apollo.mutate({
          mutation: createProductMutation,
          variables: {
            input: {
              name: this.name,
              description: this.description,
              price: this.price,
              photo: this.photo,
              category: this.selectedCategory,
              userId: this.currentUser.id,
              // type: this.type,
            },
          },
          refetchQueries: [
            {
              query: getAllProductsQuery,
            },
          ],
        });
        const product = response.data.createProduct;

        console.log("New Product:", product);
        // Clear the form fields
        this.name = "";
        this.description = "";
        this.price = "";
        alert("Product added successfully!");

        // Redirect to the 'Show Products' tab
        this.activeTab = "showProducts";

        // Redirect to profile page after successful addition and login
        // this.$router.push({
        //   name: "Profile",s
        //   params: { userId: user.id },
        // });
      } catch (error) {
        console.error("Error adding product:", error);

        // For error handling
        if (error.graphQLErrors) {
          this.userErrors = error.graphQLErrors.map((err) =>
            err.message.split("\n")
          );
        }
      }
    },
    async deleteProduct(productId) {
      // Show confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );

      // If the user confirms deletion, proceed with deletion
      if (confirmDelete) {
        try {
          const response = await this.$apollo.mutate({
            mutation: deleteProductMutation,
            variables: {
              input: {
                id: productId,
              },
            },
            update: (cache, { data: { deleteProduct } }) => {
              // Update the cache by removing the deleted Product
              const { allProducts } = cache.readQuery({
                query: getAllProductsQuery,
              });
              const updatedProducts = allProducts.filter(
                (product) => product.id !== productId
              );
              cache.writeQuery({
                query: getAllProductsQuery,
                data: { allProducts: updatedProducts },
              });
            },
          });

          console.log(response.data.deleteProduct); // Handle the response as needed
        } catch (error) {
          console.error("Error deleting Product:", error);
        }
      }
    },

    confirmDeleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.deleteProduct(productId);
      }
    },
    // Categories
    async fetchCategories() {
      try {
        const { data } = await this.$apollo.query({
          query: getAllCategoriesQuery,
          fetchPolicy: "network-only",
        });
        this.allCategories = data.allCategories; // Assign fetched categories to allCategories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async addCategory() {
      try {
        if (this.newCategoryName.trim() !== "") {
          const { data } = await this.$apollo.mutate({
            mutation: createCategoryMutation,
            variables: {
              input: {
                name: this.newCategoryName.trim(),
              },
            },
          });
          // No need to push to categories array since we're using allCategories
          this.newCategoryName = "";
          this.showForm = false;
          this.fetchCategories(); // Fetch categories again to update the dropdown
          alert("Category added successfully!");
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    cancelAddCategory() {
      this.newCategoryName = "";
      this.showForm = false;
    },
  },
  created() {
    this.fetchCategories(); // Fetch categories when component is created
  },
  watch: {
    selectedCategory() {
      // console.log("Selected category:", this.selectedCategory);
      // console.log("Selected type:", typeof this.selectedCategory);
    },
  },

  mounted() {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dwfxnxn2b",
        uploadPreset: "htodkibj",
        multiple: false, // Ensure only single file upload
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Success ! Here is the image info: ", result.info);
          console.log("The url is: ", result.info.secure_url);
          this.photo = result.info.secure_url; // Update the user to include the uploaded photo URL
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      (event) => {
        event.preventDefault(); // Prevent form submission
        myWidget.open();
      },
      false
    );
  },
};
</script>

<style scoped>
/* Add styles for tabs */
.tabs {
  display: flex;
}

.tab {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-bottom: none;
}

.tab.active {
  background-color: #a0abed;
  border-color: #ddd;
}

.tab:last-child {
  border-bottom: 1px solid #ccc; /* Ensure last tab has bottom border */
}
</style>



