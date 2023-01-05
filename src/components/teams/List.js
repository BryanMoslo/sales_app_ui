import Table from "../common/table";
import {Link, useFetcher, useLoaderData} from "react-router-dom";
import List from "../common/list";
import {baseUrl, industryColor} from "../utils/utils";



export async function loader() {
    const response = await fetch(baseUrl('teams'))

    if (response.status === 404) {
        throw new Response('This page does not exists', {status: 404})
    }

    const json = await response.json()


    return json.data
}

export default function TeamsList() {
    const teams = useLoaderData()
    const fetcher = useFetcher()


    return (
        <List title="Team" linkTo="/teams/create">
            <Table columns={['#','Name', 'Industry']}>
                <>
                    {teams.map((team, i) => (
                        <tr key={team.id}>
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
                                <fetcher.Form method="delete" action={`${team.id}/destroy`} className="inline-block">
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </fetcher.Form>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
  );
}
