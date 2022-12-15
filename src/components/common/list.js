import {Link} from "react-router-dom";

export default function List({title, linkTo, isLoading, children}) {
    return (
        <div>
            <div className="mt-4 flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">{title}s</h3>

                <Link to={linkTo}>
                    <button className="px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                        Create a {title}
                    </button>
                </Link>
            </div>


            {isLoading ? (
                <div>Loading...</div>
            ) : children}
        </div>
    )
}