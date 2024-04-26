import gql from "graphql-tag";

// Query to fetch all users
export const getAllUsersQuery = gql`
  query {
    allUsers {
      id
      name
      email
      country
      photoUrl
      admin
    }
  }
`;

//Query to fetch current_user
// export const getCurrentUserQuery = gql`
//   query CurrentUser{
//     currentUser {
//       id
//       name
//       email
//       photoUrl
//     }
//   }
// `;

//Query to fetch single user based on params
export const getUserQuery = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      country
      region
      city
      photoUrl
    }
  }
`;


// Mutation to create a new user
export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      country
      region
      city
      photoUrl
      #admin
    }
  }
`;


// Mutation to log in 
export const loginUserMutation = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        id
        name
        email
        country
        photoUrl
        admin
        }
      errors
    }
    
  }
`;

// Mutation to delete a user
export const deleteUserMutation = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      success
      message
    }
  }
`;

// Mutation to edit a user
export const editUserMutation = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      id
      name
      email
      country
      region
      city
    }
  }
`;