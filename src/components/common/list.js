import {Link} from "react-router-dom";
import pluralize from "pluralize";

export default function List({title, linkTo, isLoading, children}) {
    let capitalizedTitle = title
    capitalizedTitle = `${capitalizedTitle.charAt(0).toUpperCase()}${capitalizedTitle.slice(1)}`

    return (
        <div>
            <div className="mt-4 flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">{pluralize(capitalizedTitle)}</h3>

                <Link to={linkTo}>
                    <button className="px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                        Create {pluralize(capitalizedTitle, 1)}
                    </button>
                </Link>
            </div>


            {isLoading ? (
                <div>Loading...</div>
            ) : children}
        </div>
    )
}