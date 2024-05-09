<template>
  <nav class="navbar navbar-expand-lg bg-primary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">POS App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        style="flex-grow: 0"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!--form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form-->
          <template v-if="currentUser !== null">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/"
                >Order Manager</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/products"
                >Product Manager</a
              >
            </li>
          </template>

          <template v-if="currentUser !== null && currentUser.admin">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/users"
                >User Manager</a
              >
            </li>
          </template>

          <template v-if="currentUser === null">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/login"
                >Login</a
              >
            </li>

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/signup"
                >Sign-Up</a
              >
            </li>
          </template>

          <!-- <li class="nav-item">
            <a class="nav-link active" href="/profile">Profile</a>
          </li> -->
          <template v-if="currentUser !== null">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>

              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    :href="`/user/${currentUser.id}/edit`"
                    >Edit Profile</a
                  >
                </li>

                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="/login" @click.prevent="logout"
                    >Logout</a
                  >
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  methods: {
    ...mapMutations(["clearUser"]),
    logout() {
      // Call the clearUser mutation to clear currentUser state
      this.clearUser();
      this.$router.push("/login"); // Redirect to the login page
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mounted() {
    console.log(this.currentUser); // Access currentUser using this.currentUser
  },
};
</script>

<style scoped>
/* Add styles for fixed header */
.fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Ensure the header is above other content */
}
</style>