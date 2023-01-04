import Table from "../common/table";
import {useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import List from "../common/list";
import {baseUrl, industryColor} from "../utils/utils";

export default function TeamsList() {
    const [currentDeleted, setCurrentDeleted] = useState('')
    const initialTeams = useLoaderData()
    const [teams, setTeams] = useState(initialTeams);
    const deletingClass = 'opacity-20'

    function handleDelete(e) {
        e.preventDefault()

        const { target } = e;
        const { dataset } = target;
        const { id:teamID } = dataset;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        fetch(baseUrl(`teams/${teamID}`), options)
            .then(res => {
                if (res.ok) {
                    setTeams(teams.filter(t => t.id !== teamID))
                    setCurrentDeleted('')
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <List title="Team" linkTo="/teams/create">
            <Table columns={['#','Name', 'Industry']}>
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
            </Table>
        </List>
  );
}
