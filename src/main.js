import { createApp } from 'vue';
import App from './App.vue';
import * as apolloProvider from "./apollo.provider";
import router from './router';
import { createStore } from 'vuex'; // Import createStore from Vuex
import createPersistedState from 'vuex-persistedstate'; // Import createPersistedState from vuex-persistedstate


const store = createStore({
    state: {
        // Define your initial state here
        currentUser: null,
    },
    mutations: {
        // Define your mutations here
        setUser(state, user) {
            state.currentUser = user;
        },
        clearUser(state) {
            state.currentUser = null;
        },
    },
    plugins: [createPersistedState()], // Use createPersistedState plugin to persist Vuex state
});
export default store;



const app = createApp(App);

app.use(router);
app.use(apolloProvider.provider);
app.use(store); // Use Vuex in the app
app.mount("#app");
