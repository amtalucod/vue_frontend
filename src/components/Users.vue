<template>
  <div>
    <br />
    <br />
    <br />
    <div class="container">
      <h1>All users</h1>
      <div class="center-container">
        <table class="table table-hover table-bordered">
          <thead class="table-primary">
            <tr>
              <th>Admin</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>MobileNumber</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td>{{ user.admin }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.mobileNumber }}</td>
              <td><a :href="`/user/${user.id}`">View</a></td>
              <td><a :href="`/user/${user.id}/edit`">Edit</a></td>
              <td>
                <button @click="confirmDeleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsersQuery } from "../graphql";
import { deleteUserMutation } from "../graphql";

export default {
  name: "AllUsers",
  apollo: {
    allUsers: {
      query: getAllUsersQuery,
      fetchPolicy: "network-only", // optional, ensures data is always fetched from the server
    },
  },
  methods: {
    async deleteUser(userId) {
      try {
        const response = await this.$apollo.mutate({
          mutation: deleteUserMutation,
          variables: {
            input: {
              id: userId,
            },
          },
          update: (cache, { data: { deleteUser } }) => {
            // Update the cache by removing the deleted user
            const { allUsers } = cache.readQuery({ query: getAllUsersQuery });
            const updatedUsers = allUsers.filter((user) => user.id !== userId);
            cache.writeQuery({
              query: getAllUsersQuery,
              data: { allUsers: updatedUsers },
            });
          },
        });

        console.log(response.data.deleteUser); // Handle the response as needed
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    confirmDeleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.deleteUser(userId);
      }
    },
  },
};
</script>
