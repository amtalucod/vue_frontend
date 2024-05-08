<template>
  <br />
  <br />
  <br />
  <div class="container bg-primary-subtle">
    <div class="row">
      <div class="col-md-10">
        <div class="jumbotron">
          <div class="d-flex flex-column">
            <div>
              <div v-if="currentUser">
                <!-- <img
                  v-if="photoUrlArray && photoUrlArray.length > 0"
                  :src="photoUrlArray[0]"
                  alt="User's Photo"
                  class="img-thumbnail align-self-start"
                  style="width: 300px; height: 400px; object-fit: cover"
                  :data-bs-toggle="'modal'"
                  :data-bs-target="'#imageModal'"
                /> -->

                <h3>{{ currentUser.firstName }}</h3>
                <!-- <p>{{ currentUser.photoUrl }}</p> -->
              </div>
              <div v-else>
                <p>No data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button id="upload_widget" class="cloudinary-button">Upload files</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
    // photoUrlArray() {
    //   if (this.currentUser && this.currentUser.photoUrl) {
    //     return JSON.parse(this.currentUser.photoUrl);
    //   } else {
    //     return [];
    //   }
    // },
  },

  mounted() {
    // Check if currentUser exists and navigate to profile page
    if (this.currentUser) {
      this.navigateToProfile();
    } else {
      console.log("No currentUser available");
    }
    console.log("Attribute photoUrl (string):", this.currentUser.photoUrl); // Access currentUser using this.currentUser

    console.log(this.photoUrlArray[0]);
    console.log("This is array length: ", this.photoUrlArray.length);

    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dwfxnxn2b",
        uploadPreset: "htodkibj",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Success ! Here is the image info: ", result.info);
          console.log("The url is: ", result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  },
  methods: {
    navigateToProfile() {
      // Navigate to profile page with userId as parameter
      this.$router.push({
        name: "Profile",
        params: { userId: this.currentUser.id },
      });
    },
  },
};
</script>
