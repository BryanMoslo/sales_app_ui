import {Link} from "react-router-dom";
import Table from "../template/table";
import {useState, useEffect} from "react";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/teams/`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setTeams(data)
            })
    }, []);


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

            {isLoading ? (
                <div>Loading...</div>
            ) : <Table title={'Team List'} columns={['ID','Name', 'Industry']}>
                <>
                    {teams.map((team, i) => (
                        <tr key={team.id}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    <Link to={`${team.id}`}>{i+1}</Link>
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="ml-4">
                                    <div className="text-sm leading-5 text-gray-900">
                                        {team?.name ? team?.name : '-'}
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {team?.industry ? team.industry : '-'}
                                </div>
                            </td>


                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                <Link to={`${team.id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                                <a href="google.com" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                        </tr>
                    ))}
                </>
            < /Table>}
        </div>
    );
}

export default Teams;
