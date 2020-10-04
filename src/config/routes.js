//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin Pages
import AdminHome from "../pages/Admin/AdminHome";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminNews from "../pages/Admin/News";
import AdminCategories from "../pages/Admin/Categories";
import AdminVideos from "../pages/Admin/Videos";
import AdminPodcasts from "../pages/Admin/Podcasts";

//User Pages
import Home from "../pages/Home";
import News from "../pages/News";

//Error Page

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/noticias",
                component: AdminNews,
                exact: true
            },
            {
                path: "/admin/categorias",
                component: AdminCategories,
                exact: true
            },
            {
                path: "/admin/podcasts",
                component: AdminPodcasts,
                exact: true
            },
            {
                path: "/admin/videos",
                component: AdminVideos,
                exact: true
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/articulos",
                component: News,
                exact: true
            }
        ]
    }
]

export default routes;