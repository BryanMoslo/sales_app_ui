import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ClientsList from "./components/clients/List";
import Employees from "./components/employees/List";
import OffersCreate from "./components/offers/Create";
import OffersList from "./components/offers/List";
import SalesList from "./components/sales/List";
import Teams from "./components/teams/List";
import TeamView from "./components/teams/Show";
import TeamsCreate from "./components/teams/Create";
import UIComponents from "./components/template/components";
import Create from "./components/clients/Create";
import CreateEmployees from "./components/employees/Create";
import ClientView from "./components/clients/Show";

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
                element: <OffersList />,
            },
            {
                path: "offers/create",
                element: <OffersCreate />,
            },

            {
                path: "sales",
                element: <SalesList />,
            },
            {
                path: "teams",
                element: <Teams />,
            },
            {
                path: "teams/create",
                element: <TeamsCreate />,
            },
            {
                path: "components",
                element: <UIComponents />,
            },
            {
                path: "teams/:teamId",
                element: <TeamView />,
            },
            {
                path: "employees/create",
                element: <CreateEmployees />,
            },
            {
                path: "clients/:clientId",
                element: <ClientView />,
            },
        ]
    },

]);

export default router;