//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";

//Admin Pages
import AdminHome from "../pages/Admin/AdminHome";
import AdminSignIn from "../pages/Admin/SignIn";

//User Pages

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
            }
        ]
    }
]

export default routes;