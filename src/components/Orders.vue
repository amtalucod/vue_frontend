<template>
  <div>
    <br /><br /><br />
    <div class="tabs">
      <div
        class="tab"
        @click="activeTab = 'showProducts'"
        :class="{ active: activeTab === 'showProducts' }"
      >
        Products
      </div>
      <div
        class="tab"
        @click="activeTab = 'checkout'"
        :class="{ active: activeTab === 'checkout' }"
      >
        Checkout Details
      </div>
    </div>

    <div class="tab-content">
      <div v-show="activeTab === 'showProducts'">
        <!-- Content for Show Products tab -->
        <h1>Products</h1>
        <div>
          <!-- Filter buttons -->
          <div class="filter-buttons">
            <button
              @click="filterProducts('All')"
              :class="{ active: selectedCategory === 'All' }"
            >
              All
            </button>
            <button
              v-for="category in allCategories"
              :key="category.id"
              @click="filterProducts(category.name)"
              :class="{ active: selectedCategory === category.name }"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Product Matches -->
          <div v-if="filteredProducts.length > 0">
            <!-- Product card content -->
            <div class="container">
              <div>
                <div>
                  <div class="d-flex flex-wrap" style="gap: 40px">
                    <div
                      v-for="product in filteredProducts"
                      :key="product.id"
                      class="card matches-card mb-3 clickable-card"
                      style="width: 250px; min-height: 300px"
                      @click="openModal(product)"
                    >
                      <img
                        :src="product.photo"
                        class="card-img-top"
                        alt="..."
                        style="height: 60%; object-fit: cover"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                      </div>

                      <div class="card-body">
                        <h5>₱ {{ product.price }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- No matches message -->
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body text-center">
                      <h5>No products that matches this category yet.</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'checkout'">
        <!-- Content for Create Product tab -->
        <h1>Checkout</h1>
        <div class="form-container">
          <form @submit.prevent="addCustomer">
            <h3>Customer Information</h3>
            <!-- Email input field with dropdown for existing customers -->
            <div class="form-row">
              <label for="email">Email Address:</label>
              <div class="input-with-dropdown">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  @input="handleInputChange"
                  @click="toggleDropdown"
                />
                <div v-show="showDropdown" class="dropdown">
                  <select
                    v-model="selectedCustomer"
                    @change="updateCustomerInfo"
                  >
                    <option value="" disabled selected>
                      Select a customer
                    </option>
                    <option
                      v-for="customer in allCustomers"
                      :key="customer.email"
                      :value="customer.email"
                    >
                      {{ customer.email }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-row">
              <label for="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                v-model="mobile"
                class="form-control"
                required
              />
            </div>

            <div class="form-row">
              <label for="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                v-model="firstName"
                class="form-control"
                required
              />

              <label for="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                v-model="lastName"
                class="form-control"
                required
              />
            </div>
            <br />

            <h3>Order Option</h3>
            <div class="filter-buttons">
              <button
                @click.prevent="setOrderType('online')"
                :class="{ active: orderType === 'online' }"
              >
                Online Order
              </button>
              <button
                @click.prevent="setOrderType('inStore')"
                :class="{ active: orderType === 'inStore' }"
              >
                In-Store Order
              </button>
            </div>

            <br />
            <div v-if="orderType === 'online'" class="delivery-billing-info">
              <h3>Delivery & Billing Information</h3>

              <div class="form-row">
                <label class="form-label">Region </label>
                <select
                  name="region"
                  class="form-control form-control-md"
                  id="region"
                  v-model="selectedRegion"
                  @change="fillProvinces"
                >
                  <option
                    v-for="region in regions"
                    :key="region.region_code"
                    :value="region.region_code"
                  >
                    {{ region.region_name }}
                  </option>
                </select>

                <label class="form-label"> Province </label>
                <select
                  v-model="selectedProvince"
                  @change="fillCities"
                  class="form-control form-control-md"
                >
                  <option
                    v-for="province in provinces"
                    :key="province.province_code"
                    :value="province.province_code"
                  >
                    {{ province.province_name }}
                  </option>
                </select>
              </div>

              <div class="form-row">
                <label class="form-label">City *</label>
                <select
                  v-model="selectedCity"
                  @change="fillBarangays"
                  class="form-control form-control-md"
                >
                  <option
                    v-for="city in cities"
                    :key="city.city_code"
                    :value="city.city_code"
                  >
                    {{ city.city_name }}
                  </option>
                </select>

                <label class="form-label">Barangay *</label>
                <select v-model="barangay" class="form-control form-control-md">
                  <option
                    v-for="barangay in barangays"
                    :key="barangay.brgy_code"
                    :value="barangay.brgy_name"
                  >
                    {{ barangay.brgy_name }}
                  </option>
                </select>
              </div>

              <div class="form-row">
                <label for="street">Street: </label>
                <input
                  type="street"
                  id="street"
                  v-model="street"
                  class="form-control"
                  required
                />

                <label for="room">Room/Unit: </label>
                <input
                  type="room"
                  id="room"
                  v-model="room"
                  class="form-control"
                />
              </div>

              <div class="form-row">
                <label for="floor">Floor: </label>
                <input
                  type="floor"
                  id="floor"
                  v-model="floor"
                  class="form-control"
                />

                <label for="bldg">Building: </label>
                <input
                  type="bldg"
                  id="bldg"
                  v-model="bldg"
                  class="form-control"
                />
              </div>

              <div class="form-row">
                <label for="landmark">Nearest Landmark: </label>
                <input
                  type="landmark"
                  id="landmark"
                  v-model="landmark"
                  class="form-control"
                />

                <label for="remarks">Remarks: </label>
                <input
                  type="remarks"
                  id="remarks"
                  v-model="remarks"
                  class="form-control"
                />
              </div>

              <br />
              <h3>Shipping Information</h3>
              <button
                @click.prevent="showShippingOptions"
                class="btn btn-primary"
              >
                Show Available Shipping Options
              </button>

              <div
                id="shippingOptions"
                style="display: none"
                class="filter-buttons"
              >
                <br />
                <button
                  @click.prevent="setShippingOption('regular')"
                  :class="{
                    active: selectedShippingOption === 'regular',
                  }"
                >
                  Regular - ₱100
                </button>
                |
                <button
                  @click.prevent="setShippingOption('sameDay')"
                  :class="{
                    active: selectedShippingOption === 'sameDay',
                  }"
                >
                  Same Day - ₱200
                </button>
              </div>
              <br /><br />
            </div>

            <h3>Payment Method</h3>
            <div class="filter-buttons">
              <button
                @click.prevent="setPaymentMethod('Cash on Delivery')"
                :class="{
                  active: selectedPaymentMethod === 'Cash on Delivery',
                }"
              >
                Cash On Delivery
              </button>

              <button
                @click.prevent="setPaymentMethod('Gcash')"
                :class="{ active: selectedPaymentMethod === 'Gcash' }"
              >
                GCash
              </button>

              <button
                @click.prevent="setPaymentMethod('Bank Transfer')"
                :class="{ active: selectedPaymentMethod === 'Bank Transfer' }"
              >
                Bank Transfer
              </button>
            </div>

            <br />
            <!-- Submit Button -->
            <button type="submit" class="btn btn-success">Place Order</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body"
            style="text-align-last: center"
            v-show="selectedProduct"
          >
            <img
              :src="selectedProduct.photo"
              class="card-img-top"
              alt="..."
              style="height: 250px; width: 350px; object-fit: cover"
            />
            <!-- Quantity controls -->
            <div class="quantity-controls">
              <button
                class="btn btn-secondary btn-sm"
                @click="decrementQuantity"
              >
                -
              </button>

              <input
                type="text"
                id="quantity"
                v-model="quantity"
                class="form-control"
                style="width: 50px"
                pattern="[0-9]*"
                inputmode="numeric"
              />

              <button
                class="btn btn-secondary btn-sm"
                @click="incrementQuantity"
              >
                +
              </button>
            </div>
          </div>
          <div class="modal-body">
            <p>Product Name: {{ selectedProduct.name }}</p>
            <p>Product Description: {{ selectedProduct.description }}</p>
            <p>Price: ₱{{ selectedProduct.price }}</p>
          </div>
          <div class="modal-body" v-show="!selectedProduct">
            <p>No product selected</p>
          </div>
          <div class="modal-footer">
            <!-- Add to Cart button -->
            <button
              class="add-to-cart-button btn btn-success"
              @click="addToCart"
            >
              Add to Cart
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart section -->
    <div class="cart-section" v-show="true">
      <h3>Cart</h3>
      <!-- Cart items -->
      <div v-if="cartItems.length > 0">
        <div v-for="cartItem in cartItems" :key="cartItem.id">
          <!-- Display cart item details -->
          <img :src="cartItem.photo" alt="Product Photo" />
          <h5>{{ cartItem.name }}</h5>
          <p>{{ cartItem.description }}</p>
          <p>₱ {{ cartItem.price }}</p>
          Qty: <input type="number" v-model="cartItem.quantity" />
          <button
            @click="removeItem(cartItem.id)"
            class="btn btn-secondary btn-sm"
          >
            Remove Item
          </button>
          <br /><br /><br />
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>

      <!-- Voucher code input (optional) -->
      <!-- <div>
        <input
          type="text"
          v-model="voucherCode"
          placeholder="Enter Voucher Code"
        />
        <button @click="applyVoucher">Apply</button>
        <span v-if="voucherApplied">Voucher applied successfully!</span>
        <span v-if="voucherError">Invalid voucher code. Please try again.</span>
      </div> -->

      <!-- Order Summary -->
      <div v-if="cartItems.length > 0">
        <h3>Order Summary</h3>
        <p>Subtotal: ₱ {{ subtotal }}</p>
        <p>Delivery Fee: ₱ {{ deliveryFee }}</p>
        <p>Convenience Fee: ₱ {{ convenienceFee }}</p>
        <p v-if="voucherApplied">Voucher Code: {{ voucherCode }}</p>
        <h5>Grand Total: ₱ {{ grandTotal }}</h5>
      </div>

      <!-- Checkout button -->
      <button
        v-if="cartItems.length > 0 && activeTab !== 'checkout'"
        @click="checkout"
        class="btn btn-primary"
      >
        Checkout
      </button>
      <button
        v-if="activeTab === 'checkout'"
        @click="goToProductsTab"
        class="btn btn-primary"
      >
        Back to Products
      </button>
    </div>
  </div>
</template>

<script>
import {
  getAllProductsQuery,
  getAllCategoriesQuery,
  createCustomerMutation,
  createOrderMutation,
  getAllCustomersQuery,
  getCustomerByEmailQuery,
} from "../graphql";
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import provinceData from "/province.json"; // Import province.json file
import regionData from "/region.json";
import cityData from "/city.json";
import barangayData from "/barangay.json";

emailjs.init("ouDacUSmfIwMRbir1"); //email config emailjs

export default {
  name: "AllProducts",
  data() {
    return {
      activeTab: "showProducts",

      allCategories: [],
      selectedCategory: "All",
      allProducts: [],
      allCustomers: [],
      selectedCustomer: null,
      // selectedCustomerEmail: "",
      filteredCustomers: [],
      showDropdown: false,

      selectedProduct: {
        name: "",
        description: "",
        price: "",
        photo: "",
      },

      quantity: 1, // Initial quantity
      cartItems: [],
      bsModal: null,
      selectedShippingOption: "regular",
      selectedPaymentMethod: "",
      orderType: "online",

      //customer data
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      country: "Philippines",
      city: "",
      barangay: "",
      floor: "",
      landmark: "",
      province: "",
      street: "",
      room: "",
      bldg: "",
      remarks: "",

      //order data
      userId: "",
      productid: "",
      customerId: "",
      orderOption: "",
      orderStatus: "pending",
      shipping: "",
      payment: "",

      //locations data
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
      selectedRegion: "",
      selectedProvince: "",
      selectedCity: "",
      selectedBarangay: "",
    };
  },
  apollo: {
    allProducts: {
      query: getAllProductsQuery,
      fetchPolicy: "network-only", // optional, ensures data is always fetched from the server
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    filteredProducts() {
      // Using ternary operator
      const filtered =
        this.selectedCategory === "All" || !this.selectedCategory
          ? this.allProducts
          : this.allProducts.filter(
              (product) => product.category === this.selectedCategory
            );
      // Log a copy of the filteredProducts array
      // console.log("Filtered Products:", filtered);
      return filtered;
    },
    subtotal() {
      return this.cartItems
        .reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)
        .toFixed(2);
    },
    // deliveryFee() {
    //   return this.selectedShippingOption === "regular" ? "100.00" : "200.00";
    //   // return (50.0).toFixed(2);
    // },
    deliveryFee() {
      switch (this.selectedShippingOption) {
        case "regular":
          return "100.00";
        case "sameDay":
          return "200.00";
        case "free":
          return "0.00";
        default:
          return "0.00"; // Default to free if no option is selected
      }
    },
    convenienceFee() {
      return (10.0).toFixed(2);
    },
    grandTotal() {
      let total =
        parseFloat(this.subtotal) +
        parseFloat(this.deliveryFee) +
        parseFloat(this.convenienceFee);
      if (this.voucherApplied) {
        total -= parseFloat(this.voucherAmount);
      }
      return total.toFixed(2);
    },
  },
  methods: {
    fetchRegions() {
      // Fetch regions data (you can implement this based on your actual data source)
      // For now, I'll just hardcode some example data
      this.regions = this.regions = regionData;
    },
    fillProvinces() {
      // Method to fill provinces dropdown based on selected region
      this.provinces = provinceData.filter(
        (province) => province.region_code === this.selectedRegion
      );
    },
    fillCities() {
      // Method to fill cities dropdown based on selected province
      // You can implement this based on your actual data source
      this.cities = cityData.filter(
        (city) => city.province_code === this.selectedProvince
      );
      // Store the actual province name
      const selectedProvinceData = provinceData.find(
        (province) => province.province_code === this.selectedProvince
      );
      this.province = selectedProvinceData.province_name;
    },
    fillBarangays() {
      // Method to fill barangays dropdown based on selected city
      // You can implement this based on your actual data source
      this.barangays = barangayData.filter(
        (barangay) => barangay.city_code === this.selectedCity
      );
      // Store the actual city name
      const selectedCityData = cityData.find(
        (city) => city.city_code === this.selectedCity
      );
      this.city = selectedCityData.city_name;
      // console.log("Barangay: ", this.barangays);
    },
    handleInputChange() {
      const searchTerm = this.email.toLowerCase();
      this.filteredCustomers = this.allCustomers.filter((customer) =>
        customer.email.toLowerCase().includes(searchTerm)
      );
    },
    updateCustomerInfo() {
      // Implement your logic to update customer info
      this.fetchCustomerByEmail(this.selectedCustomer);
      // console.log("Selected Email: ", this.selectedCustomer);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async fetchCustomerByEmail(email) {
      try {
        const response = await this.$apollo.query({
          query: getCustomerByEmailQuery,
          fetchPolicy: "network-only",
          variables: {
            email: email,
          },
        });
        this.customer = response.data.customerByEmail;
        // console.log("Selected email: ", this.customer.email);

        // Update the input field with the selected email
        this.email = this.customer.email;
        this.mobile = this.customer.mobile;
        this.firstName = this.customer.firstName;
        this.lastName = this.customer.lastName;
        this.country = this.customer.country;
        this.city = this.customer.city;
        this.barangay = this.customer.barangay;
        this.floor = this.customer.floor;
        this.landmark = this.customer.landmark;
        this.province = this.customer.province;
        this.street = this.customer.street;
        this.room = this.customer.room;
        this.bldg = this.customer.bldg;
        this.remarks = this.customer.remarks;
        // fill the dropdown of the locations
        this.selectedRegion = this.customer.region;
        this.fillProvinces();
        this.selectedProvince = this.customer.provinceCode;
        this.fillCities();
        this.selectedCity = this.customer.cityCode;
        this.fillBarangays();
        this.barangay = this.customer.barangay;
      } catch (error) {
        console.error("Error fetching cinema by timeslot:", error);
      }
    },

    async fetchCustomers() {
      try {
        const response = await this.$apollo.query({
          query: getAllCustomersQuery,
          fetchPolicy: "network-only",
        });
        this.allCustomers = response.data.allCustomers;

        console.log("All Customers: ", this.allCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    setOrderType(option) {
      // Update the selected shipping option
      this.orderType = option;
      if (this.orderType == "online") {
        this.selectedShippingOption = "regular";
      } else {
        this.selectedShippingOption = "free";
      }
    },
    setPaymentMethod(option) {
      this.selectedPaymentMethod = option;
      console.log("Payment method selected: ", this.selectedPaymentMethod);
    },
    setShippingOption(option) {
      // Update the selected shipping option
      this.selectedShippingOption = option;
    },
    showShippingOptions() {
      // Toggle the visibility of shipping options
      const shippingOptions = document.getElementById("shippingOptions");
      shippingOptions.style.display =
        shippingOptions.style.display === "none" ? "block" : "none";
    },
    goToProductsTab() {
      this.activeTab = "showProducts";
    },
    checkout() {
      this.activeTab = "checkout";
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      this.cartItems.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        quantity: this.quantity,
        price: this.selectedProduct.price,
        photo: this.selectedProduct.photo,
      });
      // Optionally, you can reset the quantity

      this.quantity = 1;
      // Close the modal
      if (this.bsModal) {
        this.bsModal.hide(); // Close the modal if bsModal is defined
      }
    },
    removeItem(itemId) {
      // Find the index of the item in the cartItems array
      const index = this.cartItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        // Remove the item from the cartItems array
        this.cartItems.splice(index, 1);
      }
    },
    openModal(product) {
      this.selectedProduct = product;
      const modal = document.getElementById("productModal");
      this.bsModal = new bootstrap.Modal(modal); // Initialize bsModal
      this.bsModal.show(); // Show the modal
    },
    // Categories
    filterProducts(category) {
      this.selectedCategory = category;
      // console.log("Selected Products:", this.selectedProduct);
      // console.log("Selected Category: ", this.selectedCategory);
      // console.log("Selected Category: ", typeof this.selectedCategory);
    },
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
    async addCustomer() {
      try {
        if (this.cartItems.length === 0) {
          // If there is no product in the cart, throw an alert
          alert("Please add product in the cart to proceed.");
          return; // Exit the function early
        }
        // Check if payment method is selected
        if (!this.selectedPaymentMethod) {
          // If payment method is not selected, throw an alert
          alert("Please select a payment method.");
          return; // Exit the function early
        }

        const response = await this.$apollo.mutate({
          mutation: createCustomerMutation,
          variables: {
            input: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              mobile: this.mobile,
              country: this.country,
              city: this.city,
              barangay: this.barangay,
              floor: this.floor,
              landmark: this.landmark,
              province: this.province,
              street: this.street,
              room: this.room,
              bldg: this.bldg,
              remarks: this.remarks,
              region: this.selectedRegion,
              provinceCode: this.selectedProvince,
              cityCode: this.selectedCity,
              barangayCode: this.selectedBarangay,
            },
          },
        });
        const customer = response.data.createCustomer;

        console.log("New Customer:", customer);

        this.addOrder(customer);

        // Redirect to profile page after successful addition and login
        // this.$router.push({
        //   name: "Profile",s
        //   params: { userId: user.id },
        // });
      } catch (error) {
        console.error("Error adding customer:", error);

        // For error handling
        if (error.graphQLErrors) {
          this.userErrors = error.graphQLErrors.map((err) =>
            err.message.split("\n")
          );
        }
      }
    },
    async addOrder(customer) {
      try {
        // console.log("Current User ID: ", this.currentUser.id);
        // console.log("PRoduct cart qty: ", this.cartItems.quantity);
        // console.log("PRoduct cart qty: ", typeof this.cartItems.quantity);
        const products = this.cartItems.map((item) => ({
          id: item.id.toString(), // Ensure id is converted to string if it's not already
          quantity: item.quantity,
        }));
        // console.log("PRoduct args cart: ", products);
        const response = await this.$apollo.mutate({
          mutation: createOrderMutation,
          variables: {
            input: {
              userId: this.currentUser.id,
              products: products,
              customerId: customer.id,
              orderStatus: this.orderStatus,
              orderOption: this.orderType,
              shipping: this.selectedShippingOption,
              payment: this.selectedPaymentMethod,
              subtotal: this.subtotal,
              shippingFee: this.deliveryFee,
              convenience: this.convenienceFee,
              grandTotal: this.grandTotal,
            },
          },
        });
        const order = response.data.createOrder;

        console.log("New Order:", order);
        // Clear the form fields
        // this.name = "";
        // this.description = "";
        // this.price = "";
        // console.log("order details: ", order);
        const templateParams = {
          to_email: order.customer.email,
          user_name: order.user.firstName + " " + order.user.lastName,
          reference_number: order.id,
          whole_name: order.customer.firstName + " " + order.customer.lastName,
          email: order.customer.email,
          mobile: order.customer.mobile,
          delivery_address:
            order.customer.room +
            ", " +
            order.customer.floor +
            ", " +
            order.customer.bldg +
            ", " +
            order.customer.street +
            ", " +
            order.customer.barangay +
            ", " +
            order.customer.city +
            ", " +
            order.customer.province,
          shipping: order.shipping,
          payment: order.payment,
          subtotal: order.subtotal,
          shipping_fee: order.shippingFee,
          convenience_fee: order.convenience,
          grand_total: order.grandTotal,
        };
        // console.log("template details: ", templateParams);
        // await this.sendEmail("template_z6ev2qk", templateParams);

        // Clear the cart and other form fields
        this.cartItems = [];
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.mobile = "";
        this.country = "Philippines";
        this.city = "";
        this.barangay = "";
        this.floor = "";
        this.landmark = "";
        this.province = "";
        this.street = "";
        this.room = "";
        this.bldg = "";
        this.remarks = "";
        this.selectedShippingOption = "regular";
        this.selectedPaymentMethod = "";
        this.activeTab = "showProducts";

        alert(`Order Placed Successfully
        Order Reference Number: ${order.id}
        Customer Information:
        Full Name: ${order.customer.firstName} ${order.customer.lastName}
        Email Address: ${order.customer.email}
        Mobile Number: ${order.customer.mobile}
        Delivery Address: ${order.customer.room}, ${order.customer.floor}, ${order.customer.bldg}, ${order.customer.street}, ${order.customer.barangay}, ${order.customer.city}, ${order.customer.province}
        Shipping Method: ${order.shipping}
        Payment Method: ${order.payment}
        Summary
        Subtotal: ${order.subtotal}
        Shipping Fee: ${order.shippingFee}
        Convenience Fee: ${order.convenience}
        Grand Total: ${order.grandTotal}`);

        // Redirect to the 'Show Products' tab
        // this.activeTab = "showProducts";
        this.$router.push({
          name: "OrderManager",
          // params: { userId: user.id },
        });

        // Redirect to profile page after successful addition and login
        // this.$router.push({
        //   name: "Profile",s
        //   params: { userId: user.id },
        // });
      } catch (error) {
        console.error("Error adding customer:", error);

        // For error handling
        if (error.graphQLErrors) {
          this.userErrors = error.graphQLErrors.map((err) =>
            err.message.split("\n")
          );
        }
      }
    },
    async sendEmail(templateId, templateParams) {
      try {
        await emailjs.send("service_a42xxoq", templateId, templateParams);
        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },
  },
  created() {
    this.fetchCategories(); // Fetch categories when component is created
    this.fetchCustomers();
    this.fetchRegions();
  },
  // watch: {
  //   selectedCategory() {
  //     // console.log("Selected category:", this.selectedCategory);
  //     // console.log("Selected type:", typeof this.selectedCategory);
  //   },
  // },
};
</script>

<style scoped>
/* Add styles for tabs */
.container {
  width: calc(100% - 500px);
  margin-left: 100px;
}

.tabs {
  display: flex;
  margin-left: 30px;
}

.tab-content {
  flex: 1; /* Take up remaining width */
  margin-left: 30px;
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

.filter-buttons {
  margin-bottom: 10px;
}

.filter-buttons button {
  margin-right: 5px;
}

.filter-buttons .active {
  background-color: #007bff;
  color: white;
}

/* styles for cart */
.cart-section {
  position: fixed;
  top: 56px; /* Adjust the top position based on the height of your header */
  right: 0;
  width: 400px; /* Adjust width as needed */
  height: calc(
    100vh - 56px
  ); /* Set height to 100% of viewport height minus header height */
  background-color: #f8f8f8;
  padding: 20px;
  border-left: 1px solid #ccc;
  overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
}
.cart-section h2 {
  margin-bottom: 10px;
}
.cart-section img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}

.clickable-card {
  cursor: pointer;
}

/* Styles for Add to Cart button */
.add-to-cart-button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-controls {
  display: flex;
  align-items: center;
  place-content: center;
  padding: 5px;
}

.quantity-controls button {
  margin-right: 5px; /* Adjust spacing between buttons */
  margin-left: 5px;
}

/* Apply styles to the container */
.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 10px; /* Gap between columns */
}

/* Apply styles to each form row */
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Spacing between rows */
}

/* Apply styles to labels */
label {
  width: 120px; /* Fixed width for labels */
  margin-right: 10px; /* Spacing between label and input */
  text-align: right; /* Align label text to the right */
}

/* Apply styles to inputs */
input {
  flex: 1; /* Take up remaining space in the row */
}

/* email input */
.input-with-dropdown {
  position: relative;
  flex: 1;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
}

.input-with-dropdown:hover .dropdown {
  display: block;
}

.input-with-dropdown:focus-within .dropdown {
  display: block;
}
</style>



