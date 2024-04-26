<template>
  <br />
  <div class="container bg-primary-subtle">
    <div class="row">
      <div class="col-md-10">
        <div class="jumbotron">
          <div class="d-flex flex-column">
            <div>
              <div v-if="user">
                <h3>{{ user.name }}</h3>
                <p>{{ user.email }}</p>
              </div>
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

//Query to fetch single user based on params
const getUserQuery = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;
export default {
  props: ["userId"],
  apollo: {
    user: {
      query: getUserQuery,
      fetchPolicy: "network-only", // optional, ensures data is always fetched from the server
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>