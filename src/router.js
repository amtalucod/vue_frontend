import { createRouter, createWebHistory } from 'vue-router'
import store from './main';
import Users from './components/Users.vue'
import CreateUser from './components/CreateUser.vue'
import LoginUser from './components/LoginUser.vue'
import User from './components/User.vue'
import Profile from './components/Profile.vue'
import EditUser from './components/EditUser.vue'
import HelloWorld from './components/HelloWorld.vue'
import Products from './components/Products.vue'
import Orders from './components/Orders.vue'
import OrderManager from './components/OrderManager.vue'


import Test from './components/Test.vue'

const routes = [
    {
        path: '/users',
        name: 'Users',
        component: Users,
        beforeEnter: (to, from, next) => {
            if (store.state.currentUser === null) {
                // If the user is not logged in, redirect to the login page
                alert('Unauthorized access. Please log in as an admin.');
                next('/login');
            } else if (!store.state.currentUser.admin) {
                // If the user is logged in but not an admin, redirect to order manager
                alert('Unauthorized access. Please log in as an admin.');
                next('/');
            } else {
                // If the user is logged in and is an admin, allow access
                next();
            }
        }
    },
    // {
    //     path: '/',
    //     name: 'HelloWorld',
    //     component: HelloWorld
    // },
    {
        path: '/signup',
        name: 'Signup',
        component: CreateUser
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginUser,
        beforeEnter: (to, from, next) => {
            // Check if the user is already logged in
            if (store.state.currentUser) {
                // If the user is logged in, redirect to root and show alert
                alert('You are already logged in.');
                next('/');
            } else {
                // If the user is not logged in, allow access to the login page
                next();
            }
        }
    },
    {
        path: '/user/:userId',
        name: 'User',
        component: User,
        props: true //Allows passing props via route params
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/user/:userId/edit',
        name: 'EditUser',
        component: EditUser,
        props: true // Ensure that props are passed to the component
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        beforeEnter: (to, from, next) => {
            if (store.state.currentUser === null) {
                // If the user is not logged in, redirect to the login page
                alert('Please log in');
                next('/login');
            } else {
                // If the user is logged in and is an admin, allow access
                next();
            }
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        beforeEnter: (to, from, next) => {
            if (store.state.currentUser === null) {
                // If the user is not logged in, redirect to the login page
                alert('Please log in');
                next('/login');
            } else {
                // If the user is logged in and is an admin, allow access
                next();
            }
        }
    },
    {
        path: '/',
        name: 'OrderManager',
        component: OrderManager,
        beforeEnter: (to, from, next) => {
            if (store.state.currentUser === null) {
                // If the user is not logged in, redirect to the login page
                // alert('Please log in');
                next('/login');
            } else {
                // If the user is logged in and is an admin, allow access
                next();
            }
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router
