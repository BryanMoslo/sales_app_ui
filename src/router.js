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
import MyComponents from "./components/common/my-components";
import teamsLoader from "./components/teams/teams";
import Index from "./routes";
import { loader as clientsLoader } from "./components/clients/List"
import { loader as employeesLoader } from "./components/employees/List"
import { action as clientDestroyer } from "./components/clients/Destroy"
import { action as clientCreator } from "./components/clients/Create"




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [{
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Index />
                },
                {
                    path: "clients",
                    element: <ClientsList />,
                    loader: clientsLoader
                },
                {
                    path: "clients/:id/destroy",
                    action: clientDestroyer
                },
                {
                    path: "clients/create",
                    element: <ClientsCreate />,
                    action: clientCreator
                },
                {
                    path: "clients/:clientId",
                    element: <ClientsShow />,
                },
                {
                    path: "employees",
                    element: <EmployeesList />,
                    loader: employeesLoader
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
                    loader: teamsLoader,
                    errorElement: <ErrorPage />
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
                {
                    path: "my-components",
                    element: <MyComponents />
                }
            ]
        }]
    },

]);
export default router;