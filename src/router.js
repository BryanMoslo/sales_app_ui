import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ClientsList from "./components/clients/List";
import OffersList from "./components/offers/List";
import SalesList from "./components/sales/List";
import TeamsList from "./components/teams/List";
import TeamsShow from "./components/teams/Show";
import TeamsCreate from "./components/teams/Create";
import UIComponents from "./components/template/components";
import Create from "./components/clients/Create";
import OffersCreate from "./components/offers/Create";
import ClientView from "./components/clients/Show";
import SalesCreate from "./components/sales/Create";
import SalesShow from "./components/sales/Show";
import OffersShow from "./components/offers/Show";
import EmployeesList from "./components/employees/List";
import EmployeesShow from "./components/employees/Show";


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
                element: <EmployeesList />,
            },
            {
                path: "employees/:employeeId",
                element: <EmployeesShow />,
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
                element: <TeamsList />,
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