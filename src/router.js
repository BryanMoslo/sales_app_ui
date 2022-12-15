import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ClientsList from "./components/clients/List";
import Employees from "./components/employees/Employees";
import Offers from "./components/offers/Offers";
import Sales from "./components/sales/Sales";
import Teams from "./components/teams/List";
import TeamView from "./components/teams/Show";
import CreateATeam from "./components/teams/Create";
import UIComponents from "./components/template/components";
import Create from "./components/clients/Create";
import List from "./components/common/list";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "clients",
                element: <ClientsList />,
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