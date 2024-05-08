<template>
  <br />
  <br />
  <br />
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <h5 class="card-header">Edit User</h5>
          <div class="card-body">
            <form @submit.prevent="editUser">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  v-model="firstName"
                  id="firstName"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>

              <div class="form-group">
                <label for="lastName">last Name</label>
                <input
                  type="text"
                  v-model="lastName"
                  id="lastName"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>

              <div class="form-group">
                <label for="mobileNumber">Mobile Number</label>
                <input
                  type="text"
                  v-model="mobileNumber"
                  id="mobileNumber"
                  class="form-control"
                  placeholder="Mobile Number"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <br />
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { editUserMutation, getUserQuery } from "../graphql";

export default {
  props: ["userId"],

  apollo: {
    user: {
      query: getUserQuery,
      fetchPolicy: "network-only",
      variables() {
        return {
          userId: this.userId,
        };
      },
      // This function runs whenever the data is updated
      // It initializes the data properties with the fetched user data
      update(data) {
        const user = data.user;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.mobileNumber = user.mobileNumber;
        this.email = user.email;
        this.password = user.password;
      },
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async editUser() {
      try {
        await this.$apollo.mutate({
          mutation: editUserMutation,
          variables: {
            id: this.userId,
            input: {
              id: this.userId,
              firstName: this.firstName,
              lastName: this.lastName,
              mobileNumber: this.mobileNumber,
              authProvider: {
                credentials: {
                  email: this.email,
                  password: this.password,
                },
              },
            },
          },
        });
        this.$router.push("/profile"); // Redirect to home page after successful edit
      } catch (error) {
        console.error("Error editing user:", error);
      }
    },
  },
};
</script>
