import Table from "../common/table";
import {useState, useEffect} from "react";
import {Link, useLoaderData} from "react-router-dom";
import List from "../common/list";
import {baseUrl} from "../utils/utils";



export async function loader() {
    const res =  await fetch(baseUrl('employees'))

    const {data: employees} = await res.json()

    return employees
}

function Employees() {
   const initialEmployees = useLoaderData()
    const [employees, setEmployees] = useState(initialEmployees);

    const capitalizeFirst = str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        let ignore = false
            fetch(baseUrl('teams'))
                .then(res => res.json())
                .then(({data}) => {
                    if (!ignore) {
                        setEmployees(emp => emp.map(employee =>  {
                            const e = data.find(team => employee.team_id === team.id)
                            return {
                                ...employee,
                                teamName: e.name
                            }
                        }))
                    }

                })


        return () => {
            ignore = true
        }
    }, []);


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
                                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
  );
}

export default Employees;