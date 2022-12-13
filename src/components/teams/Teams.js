import Table from "../common/table";

import {useState, useEffect} from "react";
import {Link } from "react-router-dom";

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

    function industryColor(industry) {
        switch (industry) {
            case "health":
                return "text-green-800 bg-green-100";
            case "insurance":
                return "text-yellow-800 bg-yellow-100";
            case "entertainment":
                return "text-blue-800 bg-blue-100";
            default:
                return "text-gray-800 bg-gray-100";
        }
    }

    return (
    <div>
        <div className="mt-4 flex justify-between">
            <h3 className="text-3xl font-medium text-gray-700">Teams</h3>

            <Link to="/teams/create">
                <button className="px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                    Create a Team
                </button>
            </Link>
        </div>


        {isLoading ? (
            <div>Loading...</div>
        ) : <Table title={'Team List'} columns={['#','Name', 'Industry']}>
            <>
                {teams.map((team, i) => (
                    <tr key={team.id}>
                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <div className="text-sm leading-5 text-gray-900">
                                {i+1}
                            </div>
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <div className="text-sm leading-5 text-gray-900">
                                {team?.name ? team?.name : '-'}
                            </div>
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <span className={`capitalize inline-flex px-2 text-xs font-semibold leading-5 ${industryColor(team.industry)} rounded-full`}>
                                {team?.industry ? team.industry : '-'}
                            </span>
                        </td>


                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                            <a href="google.com" className="text-red-600 hover:text-red-900">Delete</a>
                        </td>
                    </tr>
                ))}
            </>
        </Table>}
    </div>
  );
}

export default Teams;
