import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ClientsList from "./components/clients/List";
import Employees from "./components/employees/Employees";
import OffersList from "./components/offers/List";
import SalesList from "./components/sales/List";
import Teams from "./components/teams/List";
import TeamsShow from "./components/teams/Show";
import TeamsCreate from "./components/teams/Create";
import UIComponents from "./components/template/components";
import Create from "./components/clients/Create";
import OffersCreate from "./components/offers/Create";
import ClientView from "./components/clients/Show";
import SalesCreate from "./components/sales/Create";
import SalesShow from "./components/sales/Show";
import OffersShow from "./components/offers/Show";


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
                path: "offers/:offerId",
                element: <OffersShow />,
            },
            {
                path: "sales",
                element: <SalesList />,
            },
            {
                path: "sales/:saleId",
                element: <SalesShow />,
            },
            {
                path: "sales/create",
                element: <SalesCreate />,
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
                element: <TeamsShow />,
            },
            {
                path: "clients/:clientId",
                element: <ClientView />,
            },
        ]
    },

]);

export default router;