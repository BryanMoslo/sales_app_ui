import Table from "../common/table";
import {Link, useFetcher, useLoaderData} from "react-router-dom";
import List from "../common/list";
import {baseUrl} from "../utils/utils";


export async function loader() {
    const res =  await fetch(baseUrl('employees'))

    const {data} = await res.json()


    const teamsRes = await fetch(baseUrl('teams'))

    const {data: teams} = await teamsRes.json()

    return data.map(employee => {
            const e = teams.find(team => employee.team_id === team.id)
            return {
                ...employee,
                teamName: e.name
            }
        }
    )
}

function Employees() {
    const employees = useLoaderData()
    const fetcher = useFetcher()


    const capitalizeFirst = str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };


    return (
        <List title="Employees" linkTo="/employees/create">
            <Table columns={['#','First Name', 'Last Name', 'Team Name', 'Role', 'Rate']}>
                <>
                    {employees.map((e, i) => (
                        <tr key={e.id}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    <Link to={e.id}>{i+1}</Link>
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {e?.first_name ? e?.first_name : '-'}
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {e?.last_name ? e?.last_name : '-'}
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {e?.teamName ? e.teamName : '-'}
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {e?.role ? capitalizeFirst(e?.role) : '-'}
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {e?.rate ? e?.rate : '0'}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                <Link to={e.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                                <fetcher.Form method="delete" action={`${e?.id}/destroy`} className="inline-block">
                                    <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                                </fetcher.Form>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
  );
}

export default Employees;