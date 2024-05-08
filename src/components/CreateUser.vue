<template>
  <br />
  <br />
  <br />
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <h5 class="card-header">Sign up</h5>
          <!-- Error handling section -->
          <div v-if="userErrors.length > 0" style="color: red">
            <h6>These error/s are prohibiting this user from being saved:</h6>
            <ul>
              <li v-for="(errorGroup, index) in userErrors" :key="index">
                <!-- Use a nested <ul> to display each error message in a new line -->
                <ul>
                  <li v-for="(error, subIndex) in errorGroup" :key="subIndex">
                    {{ error }}
                    <!-- Add <br> tag to display each error message on a new line -->
                    <br />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <form class="w-1/2 ml-auto mr-auto" @submit.prevent="addUser">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  v-model="firstName"
                  id="firstName"
                  autofocus="true"
                  autocomplete="firstName"
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
                  autofocus="true"
                  autocomplete="lastName"
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
                  autofocus="true"
                  autocomplete="mobileNumber"
                  class="form-control"
                  placeholder="Mobile Number"
                />
              </div>

              <div class="field form-group">
                <label for="email">Email</label><br />
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  name="email"
                  autofocus="true"
                  autocomplete="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>

              <div class="field form-group">
                <label for="password">Password</label><br />
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  name="password"
                  autofocus="true"
                  autocomplete="new-password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>

              <div class="field form-group">
                <label for="password_confirmation">Confirm Password</label
                ><br />
                <input
                  type="password"
                  v-model="passwordConfirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  class="form-control"
                  placeholder="Confirm Password"
                />
              </div>

              <br />
              <!-- <div class="field form-group">
                <button id="upload_widget" class="cloudinary-button">
                  Upload Photo
                </button>
              </div> -->
              <br />

              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createUserMutation,
  getAllUsersQuery,
  loginUserMutation,
} from "../graphql";
import { mapMutations } from "vuex";

export default {
  name: "AddUser",
  data() {
    return {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      // photoUrl: [],
      userErrors: [],
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async addUser() {
      try {
        if (this.password !== this.passwordConfirmation) {
          // Check if password and password confirmation match
          this.userErrors = [["Password and Password Confirmation must match"]];
          return;
        }

        const response = await this.$apollo.mutate({
          mutation: createUserMutation,
          variables: {
            input: {
              firstName: this.firstName,
              lastName: this.lastName,
              mobileNumber: this.mobileNumber,
              authProvider: {
                credentials: {
                  email: this.email,
                  password: this.password,
                },
              },
              // photoUrl: this.photoUrl,
            },
          },
          refetchQueries: [
            {
              query: getAllUsersQuery,
            },
          ],
        });
        const user = response.data.createUser;

        this.setUser(user); // Store user in Vuex store
        console.log("New User:", user);

        // After signing up, automatically log in the user
        await this.loginUser();

        // Redirect to profile page after successful addition and login
        this.$router.push({
          name: "OrderManager",
        });
      } catch (error) {
        console.error("Error adding user:", error);

        // For error handling
        if (error.graphQLErrors) {
          this.userErrors = error.graphQLErrors.map((err) =>
            err.message.split("\n")
          );
        }
      }
    },
    async loginUser() {
      // <-- Add async keyword here
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
        this.setUser(user); // Store user in Vuex store
        console.log("Logged in user:", user);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
  // mounted() {
  //   const myWidget = cloudinary.createUploadWidget(
  //     {
  //       cloudName: "dwfxnxn2b",
  //       uploadPreset: "htodkibj",
  //     },
  //     (error, result) => {
  //       if (!error && result && result.event === "success") {
  //         console.log("Success ! Here is the image info: ", result.info);
  //         console.log("The url is: ", result.info.secure_url);
  //         this.photoUrl.push(result.info.secure_url); // Update the user to include the uploaded photo URL
  //       }
  //     }
  //   );
  //   document.getElementById("upload_widget").addEventListener(
  //     "click",
  //     (event) => {
  //       event.preventDefault(); // Prevent form submission
  //       myWidget.open();
  //     },
  //     false
  //   );
  // },
};
</script>
