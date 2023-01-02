import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ClientsList from "./components/clients/List";
import OffersCreate from "./components/offers/Create";
import OffersList from "./components/offers/List";
import SalesList from "./components/sales/List";
import TeamsList from "./components/teams/List";
import TeamsShow from "./components/teams/Show";
import TeamsCreate from "./components/teams/Create";
import UIComponents from "./components/template/components";
import ClientsCreate from "./components/clients/Create";
import EmployeesCreate from "./components/employees/Create";
import ClientsShow from "./components/clients/Show";
import SalesCreate from "./components/sales/Create";
import EmployeesShow from "./components/employees/Show";
import SalesShow from "./components/sales/Show";
import OffersShow from "./components/offers/Show";
import EmployeesList from "./components/employees/List";




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
                element: <ClientsCreate />,
            },
            {
                path: "clients/:clientId",
                element: <ClientsShow />,
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
                path: "teams/:teamId",
                element: <TeamsShow />,
            },
            {
                path: "employees/create",
                element: <EmployeesCreate />,
            },
            {
                path: "employees/:employeeId",
                element: <EmployeesShow />,
            },
            {
                path: "components",
                element: <UIComponents />,
            },
        ]
    },

]);
export default router;