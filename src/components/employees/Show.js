import { useState, useEffect } from "react";
import { useParams } from "react-router";

function EmployeeView() {

    const baseUrl = 'http://localhost:3000/';
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    
    

    useEffect(() => {
        fetch(`${baseUrl}employees/${employeeId}`)
        .then(res => res.json())
        .then(({data}) => {
            setEmployee(data[0])
        })
    },[]);

    useEffect(() => {
        if(employee?.id && isLoading){
            fetch(`${baseUrl}teams`)
            .then(res => res.json())
            .then(({data}) => {
                const team = data.find(({ id }) => id === employee.team_id);
                setEmployee({
                    ...employee,
                    teamName: team.name
                })
                setIsLoading(false)
            })
        }
    }, [employee]);

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div> 
            <h3 className="text-3xl font-medium text-gray-700">Employees</h3>
            <div className="mt-8">
                <h4 className="text-gray-600">Employee</h4>
                <p>First Name: {employee?.first_name}</p>
                <p>Last Name: {employee?.last_name}</p>
                <p>Team Name: {employee?.teamName ? employee?.teamName : '-'}</p>
                <p>Role: {employee?.role ? capitalizeFirst(employee?.role) : '-'}</p>  
                <p>Rate: {employee?.rate}</p>
            </div>            
        </div>
    )
}

export default EmployeeView;
