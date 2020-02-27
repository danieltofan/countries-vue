import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "Home",
        component: () => import("../components/RegionDisplay.vue")
    },
    {
        path: "/:name",
        name: "Country",
        props: true,
        component: () => import("../components/CountryDisplay.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router