import { Outlet} from "react-router-dom";
import Header from "../components/common/header";
import Sidebar from "../components/common/sidebar";

export default function Root() {
    return (
        <>
        <div className="flex h-screen bg-gray-200 font-roboto">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div id="detail" className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
        </>
    );
}