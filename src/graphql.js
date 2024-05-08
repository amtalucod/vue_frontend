import gql from "graphql-tag";

// Query to fetch all users
export const getAllUsersQuery = gql`
  query {
    allUsers {
      id
      firstName
      lastName
      mobileNumber
      email
      admin
    }
  }
`;

//Query to fetch single user based on params
export const getUserQuery = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      mobileNumber
      email
    }
  }
`;

// Mutation to create a new user
export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      mobileNumber
      email
    }
  }
`;


// Mutation to log in 
export const loginUserMutation = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
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
      firstName
      lastName
      mobileNumber
    }
  }
`;


// Query to fetch all products
export const getAllProductsQuery = gql`
  query {
    allProducts {
      id
      name
      type
      description
      category
      price
      photo
    }
  }
`;

// Mutation to create a new product
export const createProductMutation = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      type
      category
      user{
        id
        firstName
        lastName
        }
    }
  }
`;

// Mutation to delete a product
export const deleteProductMutation = gql`
  mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      success
      message
    }
  }
`;


// Query to fetch all categories
export const getAllCategoriesQuery = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

// Mutation to create a new category
export const createCategoryMutation = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

// Mutation to create a new customer
export const createCustomerMutation = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      firstName
      lastName
      email
      mobile
      country
      city
      province
      barangay
      floor
      bldg
      street
      room
      landmark
      remarks
      region
      provinceCode
      cityCode
      barangayCode
    }
  }
`;

// Query to fetch all customers
export const getAllCustomersQuery = gql`
  query {
    allCustomers {
      id
      firstName
      lastName
      email
      mobile
      country
      city
      province
      barangay
      floor
      bldg
      street
      room
      landmark
      remarks
      region
      provinceCode
      cityCode
      barangayCode
    }
  }
`;


// Query to fetch all customers
export const getCustomerByEmailQuery = gql`
  query CustomerByEmail($email: String!){
    customerByEmail(email: $email) {
      id
      firstName
      lastName
      email
      mobile
      country
      city
      province
      barangay
      floor
      bldg
      street
      room
      landmark
      remarks
      region
      provinceCode
      cityCode
      barangayCode
    }
  }
`;

// Mutation to create a new order
export const createOrderMutation = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      user{
        firstName
        lastName
        }
      products{
        name
        description
        photo
        type
        category
        price
        quantity
        }
      customer{
        firstName
        lastName
        email
        mobile
        province
        city
        street
        barangay
        room
        floor
        bldg
        landmark
        remarks
        region
        provinceCode
        cityCode
        barangayCode
        }
      orderStatus
      orderOption
      shipping
      payment
      subtotal
      shippingFee
      convenience
      grandTotal
    }
  }
`;

// Query to fetch all orders
export const getAllOrdersQuery = gql`
  query {
    allOrders {
      id
      orderStatus
      orderOption
      qty
      shipping
      payment
      grandTotal
      customer{
        firstName
        lastName
        email
        mobile
      }
      
    }
  }
`;

// Mutation to update an order
export const updateOrderMutation = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      id
      orderStatus
      qty
      grandTotal
      customer{
        firstName
        lastName
        email
        mobile
      }
      products{
        name
        description
        price
        photo
        category
        type
      }
    }
  }
`;

// Mutation to cancel order
export const deleteOrderMutation = gql`
  mutation DeleteOrder($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      success
      message
    }
  }
`;