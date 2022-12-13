import {Link } from "react-router-dom";

function Teams() {
  return (
    <div>
      <h3 className="text-3xl font-medium text-gray-700">Teams</h3>
      <div className="mt-4">
        <div className="flex px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
            <Link to="/teams/create">
              <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                  Create a Team
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Teams;
