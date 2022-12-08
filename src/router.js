import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Clients from "./components/clients/Clients";
import Employees from "./components/employees/Employees";
import Offers from "./components/offers/Offers";
import Sales from "./components/sales/Sales";
import Teams from "./components/teams/Teams";
import UIComponents from "./components/template/components";


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
                path: "components",
                element: <UIComponents />,
            },
        ]
    },

]);

export default router;