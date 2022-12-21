import Table from "../common/table";
import {useState, useEffect} from "react";
import {Link } from "react-router-dom";
import List from "../common/list";

function Employees() {
    const baseUrl = 'http://localhost:3000/';
    const [employees, setEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}employees`)
            .then(res => res.json())
            .then(({data}) => {
              setEmployee([...employees, ...data])
            })
    }, []);

    useEffect(() => {
      if (employees.length > 0 && isLoading) {
          fetch(`${baseUrl}teams`)
              .then(res => res.json())
              .then(({data}) => {
                  setEmployee(employees.map(employee =>  {
                      const e = data.find(team => employee.team_id === team.id)
                      return {
                        ...employee,
                        teamName: e.name
                      }
                  }))
                  setIsLoading(false)
              })
      }

    }, [employees]);

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
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
  );
}

export default Employees;