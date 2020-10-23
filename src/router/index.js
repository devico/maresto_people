import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/home",
    name: "home",
    meta: {layout: 'admin', auth: true},
    component: Home,    
  },
  {
    path: "/",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty'},
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/employee/:id",
    name: "employee",    
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/Employee.vue"),
    props: true
  },
  {
    path: "/employees",
    name: "employees",
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/EmployeesList.vue"),
    props: true
  },
  {
    path: "/employees/grid",
    name: "employeesGrid",    
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/EmployeesGrid.vue"),
    props: true
  },
  {
    path: "/reports",
    name: "reports",
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/Reports.vue"),
    props: true
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/Calendar.vue"),
    props: true
  },
  {
    path: "/ppp",
    name: "ppp",
    meta: {layout: 'admin', auth: true},
    component: () => import("../views/PPP.vue"),
    props: true
  },
  
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;