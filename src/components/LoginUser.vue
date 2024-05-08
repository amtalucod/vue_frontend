<template>
  <br />
  <br />
  <br />
  <div class="container">
    <div class="row justify-content-center">
      <div class="card text-center w-50">
        <div class="card-header">
          <h1 class="card-title">POS APP</h1>
        </div>
        <div class="card-body">
          <br />
          <h4 class="card-title">Log In</h4>
          <!-- Error handling section -->
          <div v-if="errors.length > 0" style="color: red">
            <h5>Login Error:</h5>
            <ul>
              <li>
                {{ errors }}
              </li>
            </ul>
          </div>
          <form
            class="w-1/2 ml-auto mr-auto"
            @submit.prevent="loginUser"
            autocomplete="off"
          >
            <div class="field form-group">
              <label for="email"></label><br />
              <input
                type="email"
                v-model="email"
                id="email"
                name="email"
                autofocus="true"
                autocomplete="on"
                class="form-control"
                placeholder="Email"
                required
              />
            </div>

            <div class="field form-group">
              <label for="name"></label><br />
              <input
                type="password"
                v-model="password"
                id="password"
                name="password"
                autofocus="true"
                autocomplete="new-password"
                class="form-control"
                placeholder="Password"
                required
              />
            </div>
            <br />
            <button type="submit" class="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUserMutation } from "../graphql";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async loginUser() {
      try {
        const response = await this.$apollo.mutate({
          mutation: loginUserMutation,
          variables: {
            input: {
              credentials: {
                email: this.email,
                password: this.password,
              },
            },
          },
        });

        const user = response.data.loginUser.user;
        if (!user) {
          // If user is null, there are errors
          this.errors = response.data.loginUser.errors.join(", ");
        } else {
          // User is successfully logged in, reset error message
          this.errors = "";
          // Proceed with your logic for successful login
        }
        console.log("ERROR", response.data.loginUser.errors);
        this.setUser(user); // Store user in Vuex store
        console.log("Current", user);

        this.$router.push({
          name: "OrderManager",
          // params: { userId: user.id },
        });
        //console.log(user.name);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
};
</script>
