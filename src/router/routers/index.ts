import { RouteRecordRaw } from "vue-router";

export const routers: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    meta: {
      title: "Root"
    }
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../../views/home/index.vue"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "/articel/:id",
    name: "ArticelDetail",
    component: () => import("../../views/home/detail.vue"),
  },
  {
    path: "/usercenter",
    name: "UserCenter",
    component: () => import("../../views/usercenter/index.vue"),
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import("../../views/editor/index.vue"),
    meta: {
      title: '写文章'
    }
  },
  {
    path: '/editor/:id',
    name: 'ArticelEdit',
    component: () => import("../../views/editor/index.vue")
  },
  {
    path: '/articel',
    name: 'Articel',
    component: () => import("../../views/usercenter/articles.vue")
  },
  {
    path: '/draft',
    name: 'Draft',
    component: () => import("../../views/usercenter/articles.vue")
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import("../../views/usercenter/comments.vue")
  }
];
