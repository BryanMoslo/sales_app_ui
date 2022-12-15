import Table from "../common/table";
import {useState, useEffect} from "react";
import {Link } from "react-router-dom";

function Teams() {
    const baseUrl = 'http://localhost:3000/teams/';
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDeleted, setCurrentDeleted] = useState('')

    const deletingClass = 'opacity-20'

    useEffect(() => {
        fetch(`${baseUrl}`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setTeams([...teams, ...data])
            })
    }, []);



   useEffect(() => {
        let ignore = false;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        if (!ignore && currentDeleted !== '') {
            fetch(`${baseUrl}/${currentDeleted}`, options)
                .then(res => {
                    if (res.ok) {
                        setTeams(teams.filter(t => t.id !== currentDeleted))
                        setCurrentDeleted('')
                    }
                })
        }

        return () => {
            ignore = true
        }
    }, [currentDeleted, teams]);


    function handleDelete(e) {
        e.preventDefault()

        const { target } = e;
        const { dataset } = target;
        const { id:teamID } = dataset;

        setCurrentDeleted(teamID)
    }



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
        ) : <Table columns={['#','Name', 'Industry']}>
            <>
                {teams.map((team, i) => (
                    <tr key={team.id} className={team.id === currentDeleted ? deletingClass : ''}>
                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <div className="text-sm leading-5 text-gray-900">
                                <Link to={team.id}>{i+1}</Link>
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
                            <Link to={team.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                            <button className="text-red-600 hover:text-red-900" data-id={team.id} onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                ))}
            </>
        </Table>}
    </div>
  );
}

export default Teams;
