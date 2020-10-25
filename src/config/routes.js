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
import Categories from "../pages/Categories";
import Videos from "../pages/Videos";
import Podcast from "../pages/Podcast";
import Us from "../pages/Us";
import Contact from "../pages/Contact";
import ConditionsTerms from "../pages/ConditionsTerms";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PhoneCalculator from "../pages/PhoneCalculator";

//Error Page
import Error from "../pages/Error";

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
                path: "/admin/articulos",
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
            },
            {
                component: Error
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
            },
            {
                path: "/articulos/:url",
                component: News,
                exact: true
            },
            {
                path: "/categorias",
                component: Categories,
                exact: true
            },
            {
                path: "/categorias/:tag",
                component: Categories,
                exact: true
            },
            {
                path: "/videos",
                component: Videos,
                exact: true
            },
            {
                path: "/videos/:url",
                component: Videos,
                exact: true
            },
            {
                path: "/podcast",
                component: Podcast,
                exact: true
            },
            {
                path: "/podcast/:url",
                component: Podcast,
                exact: true
            },
            {
                path: "/nosotros",
                component: Us,
                exact: true
            },
            {
                path: "/contacto",
                component: Contact,
                exact: true
            },
            {
                path: "/terminos-y-condiciones",
                component: ConditionsTerms,
                exact: true
            },
            {
                path: "/aviso-de-privacidad",
                component: PrivacyPolicy,
                exact: true
            },
            {
                path: "/calculadora-telefono",
                component: PhoneCalculator,
                exact: true
            },
            {
                component: Error
            }
        ]
    }
]

export default routes;