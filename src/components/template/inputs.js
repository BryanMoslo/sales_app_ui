function Inputs(){
    return (
        <div>
            <div className="mt-8">
                <h4 className="text-gray-600">Inputs</h4>

                <div className="mt-4">
                    <div className="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
                        <label>
                            <input
                            type="radio"
                            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                            name="radio"
                            /><span className="ml-2 text-gray-700">Radio</span>
                        </label>

                        <label>
                            <input
                            type="checkbox"
                            className="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
                            name="radio"
                            /><span className="ml-2 text-gray-700">Checkbox</span>
                        </label>

                        <label className="block">
                            <input
                            type="email"
                            placeholder="Email"
                            className="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            />
                        </label>

                        <div className="relative mx-4 lg:mx-0">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                    <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            <input
                            className="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            type="text"
                            placeholder="Search"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Inputs;