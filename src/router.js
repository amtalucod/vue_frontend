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
        component: Users
        // beforeEnter: (to, from, next) => {
        //     if (store.state.currentUser !== null) {
        //         next()
        //     } else {
        //         alert('Unauthorized access. Please log in.');
        //         next('/login')
        //     }
        // }
    },
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/signup',
        name: 'Signup',
        component: CreateUser
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginUser
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
        component: Products
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/ordermanager',
        name: 'OrderManager',
        component: OrderManager
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router
