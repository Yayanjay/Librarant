import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home'
import Book from './views/Books'
import Profile from './views/Profile'
import History from './views/History'
import About from './views/About'
import DetailBook from './components/DetailBook'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'


Vue.use(VueRouter);

const mainRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
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
            // meta: 
        },
        {
            path: '/detail/:id',
            name: 'Book Detail',
            component: DetailBook
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
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
    ]
})

export default mainRouter;