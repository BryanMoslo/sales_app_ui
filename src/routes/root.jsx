import { NavLink, Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>Sales App</h1>
                <nav>
                    <ul>
                        <NavLink to={`clients/`}>Clients</NavLink>
                        <NavLink to={`employees/`}>Employees</NavLink>
                        <NavLink to={`sales/`}>Sales</NavLink>
                        <NavLink to={`offers/`}>Offers</NavLink>
                        <NavLink to={`teams/`}>Teams</NavLink>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}