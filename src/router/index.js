import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/home",
    name: "home",
    meta: {layout: 'admin', auth: true, title: 'Начало'},
    component: Home,    
  },
  {
    path: "/",
    name: "login",
    meta: {layout: 'empty', title: 'Вход'},
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty', title: 'Регистрация'},
    component: () => import("../views/register.vue")
  },
  {
    path: "/employee/:id",
    name: "employee",    
    meta: {layout: 'admin', auth: true, title: 'Сотрудники'},
    component: () => import("../views/Employee.vue"),
    props: true
  },
  {
    path: "/employees",
    name: "employees",
    meta: {layout: 'admin', auth: true, title: 'Сотрудники'},
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
    path: "/employeesnow",
    name: "employeesNow",    
    meta: {layout: 'admin', auth: true, title: 'Офис или онлайн'},
    component: () => import("../views/EmployeesNow.vue"),
    props: true
  },
  {
    path: "/reports",
    name: "reports",
    meta: {layout: 'admin', auth: true, title: 'Отчеты'},
    component: () => import("../views/Reports.vue"),
    props: true
  },
  {
    path: "/polls",
    name: "polls",
    meta: {layout: 'admin', auth: true, title: 'Опросы'},
    component: () => import("../views/Polls.vue"),
    props: true
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: {layout: 'admin', auth: true, title: 'Календарь событий'},
    component: () => import("../views/Calendar.vue"),
    props: true
  },
  {
    path: "/ppp",
    name: "ppp",
    meta: {layout: 'admin', auth: true, title: 'Разрешения удаленки'},
    component: () => import("../views/PPP.vue"),
    props: true
  },
  {
    path: "/tablesheet",
    name: "tablesheet",
    meta: {layout: 'admin', auth: true, title: 'Табель'},
    component: () => import("../views/TabelSheet.vue"),
    props: true
  },
  
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta && to.meta.title ? to.meta.title : 'Домашняя';
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