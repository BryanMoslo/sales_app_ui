import Table from "../common/table";
import {useState, useEffect} from "react";
import {Link } from "react-router-dom";
import List from "../common/list";

function Employees() {
    const baseUrl = 'http://localhost:3000/';
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDeleted, setCurrentDeleted] = useState('');

    useEffect(() => {
        fetch(`${baseUrl}employees`)
            .then(res => res.json())
            .then(({data}) => {
              setEmployees([...employees, ...data])
            })
    }, []);

    useEffect(() => {
      if (employees.length > 0 && isLoading) {
          fetch(`${baseUrl}teams`)
              .then(res => res.json())
              .then(({data}) => {
                setEmployees(employees.map(employee =>  {
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

    useEffect(() => {
        let ignore = false;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        if (!ignore && currentDeleted !== '') {
            fetch(`${baseUrl}employees/${currentDeleted}`, options)
                .then(res => {
                    if (res.ok) {
                        setEmployees(employees.filter(i => i.id !== currentDeleted))
                        setCurrentDeleted('')
                    }
                })
                .catch(err => console.error(err))
        }

        return () => {
            ignore = true
        }

    }, [currentDeleted, employees]);


    function handleDelete(e) {
        e.preventDefault()

        const { target } = e;
        const { dataset } = target;
        const { id:employeeID } = dataset;

        setCurrentDeleted(employeeID)
    }

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
                                <button className="text-red-600 hover:text-red-900 text-sm" data-id={e?.id} onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
  );
}

export default Employees;