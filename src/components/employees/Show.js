import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";

export default function EmployeesShow() {
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl('employees', employeeId)}`)
            .then(res => res.json())
            .then(({data}) => {
                const [e] = data
                setEmployee(e)
            })
    }, []);

    useEffect(() => {
        if (employee?.id && isLoading) {
            fetch(`${baseUrl('teams')}`)
                .then(res => res.json())
                .then(({data: teams}) => {
                    const team = teams.find(team => employee.team_id === team.id)

                    setEmployee({
                        ...employee,
                        team: team.name
                    })
                    setIsLoading(false)
                })
        }

    }, [employee]);

    return (
        <div>
            <h3 className="text-3xl font-medium text-gray-700">Offers</h3>
            <div className="mt-8">
                <p>Team: {employee.team}</p>
                <p>First Name: {employee.first_name}</p>
                <p>Last Name: {employee.last_name}</p>
                <p>Role: {employee.role}</p>
                <p>Rate: {employee.rate}</p>
            </div>
        </div>
    )
}