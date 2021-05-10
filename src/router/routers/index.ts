import { RouteRecordRaw } from "vue-router";

export const routers: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/h",
    meta: {
      title: "Root"
    }
  },
  {
    path: "/h",
    name: "Layout",
    component: () => import("../../views/layout/index.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../../views/home/index.vue"),
        meta: {
          title: "Home"
        }
      },
      {
        path: "",
        name: "Layout-Root",
        redirect: "/h/home"
      },
    ]
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import("../../views/editor/index.vue"),
    meta: {
      title: '写文章'
    }
  }
];
