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
import Card from "./components/common/card";
import Index from "./routes";

import { loader as clientsLoader } from "./components/clients/List"
import { loader as clientsShowLoader } from "./components/clients/Show"
import { action as clientsDestroyer } from "./components/clients/Destroy"
import { action as clientsCreator } from "./components/clients/Create"

import { loader as teamsLoader} from "./components/teams/List";
import { loader as teamsShowLoader} from "./components/teams/Show";
import { action as teamsCreator} from "./components/teams/Create";
import { action as teamsDestroyer } from "./components/teams/Destroy"

import { loader as employeesLoader } from "./components/employees/List"
import { loader as employeesShowLoader } from "./components/employees/Show"
import { action as employeesDestroyer } from "./components/employees/Destroy"
import { action as employeesCreator } from "./components/employees/Create"

import { loader as offersLoader } from "./components/offers/List"
import { loader as offersShowLoader } from "./components/offers/Show"
import { loader as offersTeamsLoader } from "./components/sales/Create"
import { action as offersDestroyer } from "./components/offers/Destroy"
import { action as offersCreator } from "./components/offers/Create"

import { loader as salesLoader } from "./components/sales/List"
import { action as salesDestroyer } from "./components/sales/Destroy"
import { action as salesCreator } from "./components/sales/Create"


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
                    action: clientsDestroyer
                },
                {
                    path: "clients/create",
                    element: <ClientsCreate />,
                    action: clientsCreator
                },
                {
                    path: "clients/:id",
                    element: <ClientsShow />,
                    loader: clientsShowLoader
                },
                {
                    path: "employees",
                    element: <EmployeesList />,
                    loader: employeesLoader
                },
                {
                    path: "employees/:id",
                    element: <EmployeesShow />,
                    loader: employeesShowLoader
                },
                {
                    path: "employees/create",
                    element: <EmployeesCreate />,
                    loader: teamsLoader,
                    action: employeesCreator
                },
                {
                    path: "employees/:employeeId",
                    element: <EmployeesShow />,
                },
                {
                    path: "employees/:id/destroy",
                    action: employeesDestroyer
                },
                {
                    path: "offers",
                    element: <OffersList />,
                    loader: offersLoader
                },
                {
                    path: "offers/create",
                    element: <OffersCreate />,
                    loader: clientsLoader,
                    action: offersCreator
                },
                {
                    path: "offers/:id",
                    element: <OffersShow />,
                    loader: offersShowLoader
                },
                {
                    path: "offers/:id/destroy",
                    action: offersDestroyer
                },
                {
                    path: "sales",
                    element: <SalesList />,
                    loader: salesLoader
                },
                {
                    path: "sales/:saleId",
                    element: <SalesShow />,
                },
                {
                    path: "sales/:id/destroy",
                    action: salesDestroyer
                },
                {
                    path: "sales/create",
                    element: <SalesCreate />,
                    action: salesCreator,
                    loader: offersTeamsLoader
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
                    action: teamsCreator
                },
                {
                    path: "teams/:id",
                    element: <TeamsShow />,
                    loader: teamsShowLoader
                },
                {
                    path: "teams/:id/destroy",
                    action: teamsDestroyer
                },
                {
                    path: "components",
                    element: <UIComponents />,
                },
                {
                    path: "my-components",
                    element: <Card />
                }
            ]
        }]
    },

]);
export default router;