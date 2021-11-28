import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home'
import Book from './views/Books'
import Profile from './views/Profile'
import History from './views/History'
import DetailBook from './components/DetailBook'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Unauthorized from './views/Unauthorized'
import NotFound from './views/NotFound'

Vue.use(VueRouter);

let authenticated = null
const credsData = {
    "username" : '', 
    "email" : '', 
    "role" : '', 
    "token" : '',
    "authenticated" : false,
    "id" : ''
  }

if (localStorage.getItem("creds")) {
    authenticated = JSON.parse(localStorage.getItem("creds")).authenticated 
} else { 
    localStorage.setItem("creds", JSON.stringify(credsData))
}

const mainRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: 'Home'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/books',
            name: 'Book',
            component: Book,
            beforeEnter: (to, from, next) => {
                if (authenticated == false) {
                    next("/unauthorized")
                } else {
                    next()
                }
            }

        },
        {
            path: '/detail/:id',
            name: 'Book Detail',
            component: DetailBook,
            beforeEnter: (to, from, next) => {
                if (authenticated == false) {
                    next("/signin")
                } else {
                    next()
                }
            }
        },
        {
            path: '/history',
            name: 'History',
            component: History,
            beforeEnter: (to, from, next) => {
                if (authenticated == false) {
                    next("/unauthorized")
                } else {
                    next()
                }
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (authenticated == false) {
                    next("/unauthorized")
                } else {
                    next()
                }
            }
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/unauthorized',
            name: 'Unauthorized',
            component: Unauthorized,
            beforeEnter: (to, from, next) => {
                if (authenticated == false) {
                    next()
                } else {
                    next("/")
                }
            }
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound
        },
    ]
})

export default mainRouter;