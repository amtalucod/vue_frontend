<template>
  <br />
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <h5 class="card-header">Edit User</h5>
          <div class="card-body">
            <form @submit.prevent="editUser">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  v-model="name"
                  id="name"
                  class="form-control"
                  placeholder="Name"
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
              <div>
                <label for="country">Country</label>
                <input
                  type="text"
                  v-model="country"
                  id="country"
                  autofocus
                  autocomplete="country"
                  class="form-control"
                  placeholder="Country"
                />
              </div>

              <div>
                <label for="state_region">State/Region</label>
                <input
                  type="text"
                  v-model="region"
                  id="state_region"
                  class="form-control"
                  placeholder="State/Region"
                />
              </div>

              <div>
                <label for="city">City</label>
                <input
                  type="text"
                  v-model="city"
                  id="city"
                  class="form-control"
                  placeholder="City"
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
        this.name = user.name;
        this.email = user.email;
        this.country = user.country;
        this.region = user.region;
        this.city = user.city;
        this.password = user.password;
      },
    },
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      country: "",
      region: "",
      city: "",
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
              name: this.name,
              authProvider: {
                credentials: {
                  email: this.email,
                  password: this.password,
                },
              },
              location: {
                country: this.country,
                region: this.region,
                city: this.city,
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
