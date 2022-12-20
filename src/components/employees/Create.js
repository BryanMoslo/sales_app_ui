import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "../common/form";
import { Select, Option } from "@material-tailwind/react";

function CreateEmployees () {

    const baseUrl = 'http://localhost:3000/';
    const [teams, setTeams] = useState([]);
    const [sentForm, setSentForm] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const initialForm = {team: '', first_name: '', last_name: '', role: '', rate: 0}
    const [employee, setEmployee] = useState(initialForm)

    useEffect(() => {
        fetch(`${baseUrl}teams`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setTeams([...teams, ...data])
            })
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                team_id: selectedTeam,
                first_name: employee.first_name, 
                last_name: employee.last_name, 
                role: selectedRole, 
                rate: parseInt(employee.rate)
            })
        };
        if (sentForm) {
            fetch(`${baseUrl}employees/create`, requestOptions)
            .then((res) => {
                setSentForm(false)
                console.log(res.json())
                if (res.ok) {
                    navigate('/employees')
                }
                return res.json()
            })
            .catch(err => { console.log(err)}); 
        }
    }, [sentForm]);

    function handleInputChange(e) {
        const { target } = e
        const { name, value } = target
        setEmployee({...employee, [name]: value})
    }   

    function handleSubmit(event) {
        event.preventDefault();
        setSentForm(!sentForm);
    }

    function handleSelectTeamChange(e) {
        setSelectedTeam(e)
    }

    const teamsOptions = [
        <Option key={'ssd324543'} disabled >{isLoading ? 'Loading Teams...' : 'Select a Team'}</Option>,
        ...teams.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
    ]
    
    function handleSelectRoleChange(e) {
        setSelectedRole(e)
    }

    return (

       <Form title="Create a Employee" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700" htmlFor="name">Team ID</label>
                    <Select
                        name="team"
                        value={''}
                        variant="outlined"
                        className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        onChange={handleSelectTeamChange}
                        children={teamsOptions}
                    />
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">First Name</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="first_name" value={employee.first_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Last Name</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="last_name" value={employee.last_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Role</label>
                    <div className="relative w-full mt-2 h-11">
                        <Select
                            name="role"
                            value={selectedRole}
                            variant="outlined"
                            className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            onChange={handleSelectRoleChange}
                        >
                            <Option disabled>Select a Role</Option>
                            <Option value="seller">Seller</Option>
                            <Option value="typist">Typist</Option>
                            <Option value="legal">Legal</Option>
                            <Option value="leader">Leader</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Rate</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="number" name="rate" value={employee.rate} onChange={handleInputChange}/>
                </div>
            </div>
       </Form>
    );
}
  
export default CreateEmployees;