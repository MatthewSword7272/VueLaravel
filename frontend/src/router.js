import {createRouter, createWebHistory} from 'vue-router'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Signup from './pages/Signup.vue'
import NotFound from './pages/NotFound.vue'
import Home from './pages/Home.vue'
import MyImages from './pages/MyImages.vue'
import DefaultLayout from './components/DefaultLayout.vue'
import {useUserStore} from './store/user'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {path: '/', component: Home, name: 'Home'},
            {path: '/images', component: MyImages, name: 'MyImages'},
        ],
        beforeEnter: async (to, from, next) => {
            try {
                const userStore = useUserStore()
                await userStore.fetchUser()
                next()
            } catch (error) {
                console.error(error)
                next(false)
            }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: Signup,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
