import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Clients from "./components/clients/Clients";
import Employees from "./components/employees/Employees";
import Offers from "./components/offers/Offers";
import Sales from "./components/sales/Sales";
import Teams from "./components/teams/List";
import TeamView from "./components/teams/Show";
import CreateATeam from "./components/teams/Create";
import UIComponents from "./components/template/components";
import Create from "./components/clients/Create";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "clients",
                element: <Clients />,
            },
            {
                path: "clients/create",
                element: <Create />,
            },
            {
                path: "employees",
                element: <Employees />,
            },
            {
                path: "offers",
                element: <Offers />,
            },
            {
                path: "sales",
                element: <Sales />,
            },
            {
                path: "teams",
                element: <Teams />,
            },
            {
                path: "teams/create",
                element: <CreateATeam />,
            },
            {
                path: "components",
                element: <UIComponents />,
            },
            {
                path: "teams/:teamId",
                element: <TeamView />,
            },
        ]
    },

]);

export default router;