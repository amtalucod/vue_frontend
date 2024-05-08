<template>
  <div>
    <br /><br /><br />
    <div class="tabs">
      <div
        class="tab"
        @click="activeTab = 'pending'"
        :class="{ active: activeTab === 'pending' }"
      >
        Pending
      </div>
      <div
        class="tab"
        @click="activeTab = 'confirmed'"
        :class="{ active: activeTab === 'confirmed' }"
      >
        Confirmed
      </div>
      <div
        class="tab"
        @click="activeTab = 'completed'"
        :class="{ active: activeTab === 'completed' }"
      >
        Completed
      </div>
    </div>
    <br />
    <router-link to="/orders" class="btn btn-primary" style="margin-left: 40px"
      >Create Order</router-link
    >

    <div class="tab-content">
      <div v-show="activeTab === 'pending'">
        <!-- Content for Show Products tab -->
        <!-- <h1>Products</h1> -->
        <br />
        <div class="container">
          <div class="center-container">
            <table class="table table-hover table-bordered">
              <thead class="table-primary">
                <tr>
                  <th>Reference Number</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Mobile Number</th>
                  <th>Product Details</th>
                  <th>Delivery Method</th>
                  <th>Payment Method</th>
                  <th>Grand Total</th>
                  <th>Change Status</th>
                  <th>Cancel Order</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop over each pending order -->
                <tr v-for="order in filteredPendings" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>
                    {{ order.customer?.firstName }}
                    {{ order.customer?.lastName }}
                  </td>
                  <td>
                    {{ order.customer?.email }}
                  </td>
                  <td>
                    {{ order.customer?.mobile }}
                  </td>
                  <!-- <td>
                    <div
                      v-for="(product, index) in order.products"
                      :key="index"
                      class="product-item"
                    >
                      <div class="product-details">
                        <img
                          :src="product.photo"
                          alt="Product Photo"
                          style="object-fit: cover; width: 100px; height: 100px"
                        />
                        <div class="product-info">
                          <span>{{ product.name }}</span>
                          <span>{{ product.category }}</span>
                          <span>Quantity: {{ order.qty[index] }}</span>
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td>{{ order.shipping }}</td>
                  <td>{{ order.payment }}</td>
                  <td>₱{{ order.grandTotal }}</td>
                  <td>
                    <!-- Confirm Button to Change Status -->
                    <button
                      @click="confirmOrder(order.id)"
                      class="btn btn-primary"
                    >
                      Confirm Order
                    </button>
                  </td>
                  <td>
                    <!-- Confirm Button to Change Status -->
                    <button
                      @click="deleteOrder(order.id)"
                      class="btn btn-danger"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'confirmed'">
        <!-- Content for Show Products tab -->
        <br />
        <div class="container">
          <!-- <h1>All Confirmed</h1> -->
          <div class="center-container">
            <table class="table table-hover table-bordered">
              <thead class="table-primary">
                <tr></tr>
                <tr>
                  <th>Reference Number</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Mobile Number</th>
                  <th>Product Details</th>
                  <th>Delivery Method</th>
                  <th>Payment Method</th>
                  <th>Grand Total</th>
                  <th>Change Status</th>
                  <th>Cancel Order</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredConfirms" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>
                    {{ order.customer?.firstName }}
                    {{ order.customer?.lastName }}
                  </td>
                  <td>
                    {{ order.customer?.email }}
                  </td>
                  <td>
                    {{ order.customer?.mobile }}
                  </td>
                  <!-- <td>
                    <div
                      v-for="(product, index) in order.products"
                      :key="index"
                      class="product-item"
                    >
                      <div class="product-details">
                        <img
                          :src="product.photo"
                          alt="Product Photo"
                          style="object-fit: cover; width: 100px; height: 100px"
                        />
                        <div class="product-info">
                          <span>{{ product.name }}</span>
                          <span>{{ product.category }}</span>
                          <span>Quantity: {{ order.qty[index] }}</span>
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td>{{ order.shipping }}</td>
                  <td>{{ order.payment }}</td>
                  <td>₱{{ order.grandTotal }}</td>
                  <td>
                    <!-- Confirm Button to Change Status -->
                    <button
                      @click="confirmOrder(order.id)"
                      class="btn btn-primary"
                    >
                      Mark as Completed
                    </button>
                  </td>
                  <td>
                    <!-- Confirm Button to Change Status -->
                    <button
                      @click="deleteOrder(order.id)"
                      class="btn btn-danger"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'completed'">
        <!-- Content for Show Products tab --><br />
        <div class="container">
          <!-- <h1>All Confirmed</h1> -->
          <div class="center-container">
            <table class="table table-hover table-bordered">
              <thead class="table-primary">
                <tr>
                  <th>Reference Number</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Mobile Number</th>
                  <th>Product Details</th>
                  <th>Delivery Method</th>
                  <th>Payment Method</th>
                  <th>Grand Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredCompletes" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>
                    {{ order.customer?.firstName }}
                    {{ order.customer?.lastName }}
                  </td>
                  <td>
                    {{ order.customer?.email }}
                  </td>
                  <td>
                    {{ order.customer?.mobile }}
                  </td>
                  <!-- <td>
                    <div
                      v-for="(product, index) in order.products"
                      :key="index"
                      class="product-item"
                    >
                      <div class="product-details">
                        <img
                          :src="product.photo"
                          alt="Product Photo"
                          style="object-fit: cover; width: 100px; height: 100px"
                        />
                        <div class="product-info">
                          <span>{{ product.name }}</span>
                          <span>{{ product.category }}</span>
                          <span>Quantity: {{ order.qty[index] }}</span>
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td>{{ order.shipping }}</td>
                  <td>{{ order.payment }}</td>
                  <td>₱{{ order.grandTotal }}</td>
                  <td>
                    <!-- Confirm Button to Change Status -->
                    <button
                      @click="deleteOrder(order.id)"
                      class="btn btn-danger"
                    >
                      Delete Record
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllOrdersQuery,
  updateOrderMutation,
  deleteOrderMutation,
} from "../graphql";
export default {
  data() {
    return {
      activeTab: "pending",
      filteredPendings: [], // Initialize filteredPendings array
      filteredConfirms: [],
      filteredCompletes: [],
    };
  },
  apollo: {
    allOrders: {
      query: getAllOrdersQuery,
      fetchPolicy: "network-only", // optional, ensures data is always fetched from the server
    },
  },
  methods: {
    // Method to filter orders by status
    filterPendings() {
      // Check if allOrders is truthy and an array
      if (this.allOrders && Array.isArray(this.allOrders)) {
        this.filteredPendings = this.allOrders.filter(
          (order) => order.orderStatus.toLowerCase() === "pending"
        );
      } else {
        // Handle the case when allOrders is not initialized or not an array
        this.filteredPendings = [];
      }
    },
    filterConfirms() {
      // Check if allOrders is truthy and an array

      if (this.allOrders && Array.isArray(this.allOrders)) {
        this.filteredConfirms = this.allOrders.filter(
          (order) => order.orderStatus.toLowerCase() === "confirmed"
        );
      } else {
        // Handle the case when allOrders is not initialized or not an array
        this.filteredConfirms = [];
      }
    },
    filterCompletes() {
      // Check if allOrders is truthy and an array

      if (this.allOrders && Array.isArray(this.allOrders)) {
        this.filteredCompletes = this.allOrders.filter(
          (order) => order.orderStatus.toLowerCase() === "completed"
        );
      } else {
        // Handle the case when allOrders is not initialized or not an array
        this.filteredCompletes = [];
      }
    },
    // Method to confirm an order
    confirmOrder(orderId) {
      // Implement the logic to change the order status
      // For example, you can send a mutation to update the order status
      console.log("Confirming order with ID:", orderId);
      const confirmed = window.confirm(
        "Are you sure you want to confirm this order?"
      );
      if (confirmed) {
        this.updateOrder(orderId);
      }
    },
    async updateOrder(orderId) {
      try {
        await this.$apollo.mutate({
          mutation: updateOrderMutation,
          variables: {
            input: {
              id: orderId,
            },
          },
          refetchQueries: [
            {
              query: getAllOrdersQuery,
            },
          ],
        });
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
    async deleteOrder(orderId) {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this order?"
      );
      if (confirmed) {
        try {
          const response = await this.$apollo.mutate({
            mutation: deleteOrderMutation,
            variables: {
              input: {
                id: orderId,
              },
            },
            update: (cache, { data: { deleteOrder } }) => {
              // Update the cache by removing the deleted user
              const { allOrders } = cache.readQuery({
                query: getAllOrdersQuery,
              });
              const updatedOrders = allOrders.filter(
                (order) => order.id !== orderId
              );
              cache.writeQuery({
                query: getAllOrdersQuery,
                data: { allOrders: updatedOrders },
              });
            },
          });

          console.log(response.data.deleteOrders); // Handle the response as needed
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    },
  },
  // Watch for changes in allOrders and filter them when updated
  watch: {
    allOrders: {
      handler() {
        this.filterPendings();
        this.filterConfirms();
        this.filterCompletes();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* Add styles for tabs */
.container {
  /* width: calc(100% - 500px); */
  margin-left: 100px;
  margin-right: 200px;
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
}

.tab.active {
  background-color: #a0abed;
  border-color: #ddd;
}

.product-item {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center align items vertically */
  margin-bottom: 10px; /* Add margin between each product */
}

.product-details {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center align items vertically */
  margin-right: 20px; /* Add margin between each product item */
}

.product-details img {
  margin-right: 10px; /* Add margin between product image and text */
}

.product-info span {
  margin-right: 10px; /* Add margin between each attribute */
}
</style>

