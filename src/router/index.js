import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "about",
            component: () => import("@/views/about_view.vue")
        },
        {
            path: "/article",
            name: "article",
            component: () => import("@/views/article_view.vue")
        },
        {
            path: "/article/:id",
            props: true,
            components: {
                default: () => import("@/views/article_page_view.vue")
            }
        },
        {
            path: "/friend",
            name: "friend",
            component: () => import("@/views/friend_view.vue")
        },
        {
            path: "/wish",
            name: "wish",
            component: () => import("@/views/wish_view.vue")
        },
        {
            path: "/target",
            name: "target",
            component: () => import("@/views/target_view.vue")
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    }
});

export default router;
