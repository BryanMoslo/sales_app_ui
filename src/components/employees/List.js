import List from "../common/list";
import Table from "../common/table";
import {Link} from "react-router-dom";
import {baseUrl, industryColor} from "../utils/utils";
import {useEffect, useState} from "react";

export default function EmployeesList() {
    const [employees, setEmployees] = useState([])
    const [currentDeleted, setCurrentDeleted] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const deletingClass = 'opacity-20'

    useEffect(() => {
        fetch(`${baseUrl('employees')}`)
            .then(res => res.json())
            .then(({data}) => {
                setEmployees([...employees, ...data])
            })
    }, []);

    useEffect(() => {
        if (employees.length > 0  && isLoading) {
                fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data: fetchedTeams}) => {

                    setEmployees(employees.map(employee =>  {
                        const team  = fetchedTeams.find(team => team.id === employee.team_id)

                        return {
                            ...employee,
                            team: team.name,
                        }
                    }))

                setIsLoading(false)
            }).catch(err => console.error(err))
        }

    }, [employees]);

    useEffect(() => {
        let ignore = false;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        if (!ignore && currentDeleted !== '') {
            fetch(`${baseUrl('employees', currentDeleted)}`, options)
                .then(res => {
                    if (res.ok) {
                        setEmployees(employees.filter(e => e.id !== currentDeleted))
                        setCurrentDeleted('')
                    }
                })
                .catch(err => console.error(err))
        }

        return () => {
            ignore = true
        }
    }, [currentDeleted, employees]);


    function handleDeleteEmployees(e) {
        e.preventDefault()

        setCurrentDeleted(e.target.dataset.id)
    }


    return (
        <List isLoading={isLoading} title="employee" linkTo="/employees/create">
            <Table columns={['#','Team', 'First Name', 'Last Name', 'Role', 'Rate']}>
                <>
                    {employees.map((employee, i) => (
                        <tr key={employee.id} className={employee.id === currentDeleted ? deletingClass : ''}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    <Link to={employee.id}>{i+1}</Link>
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {employee?.team ? employee.team : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {employee?.first_name ? employee.first_name : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {employee?.last_name ? employee.last_name : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {employee?.role ? employee.role : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {employee?.rate ? employee.rate : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                <Link to={employee.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                                <button className="text-red-600 hover:text-red-900" data-id={employee.id} onClick={handleDeleteEmployees}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
    );
}
