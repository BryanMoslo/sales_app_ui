function Table({title, columns, children}){

    return (
        <div>
            <div className="mt-8">
                <h4 className="text-gray-600">{title}</h4>

                <div className="flex flex-col mt-6">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={i}
                                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                            {col}
                                        </th>
                                    ))}
                                    <th key={columns.length} className="px-6 py-3 bg-gray-100 border-b border-gray-200"></th>
                                </tr>
                                </thead>

                                <tbody className="bg-white">
                                {children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Table;