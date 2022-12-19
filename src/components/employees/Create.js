import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "../common/form";

function CreateEmployees () {

    const [selected, setSelected] = useState('health');
    const [sentForm, setSentForm] = useState(false);
    const [values, setValues] = React.useState({
      name: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: values.name, 
                industry: selected})
        };
        if (sentForm) {
            fetch('http://localhost:3000/employees/create', requestOptions)
            .then((response) => {
                setSentForm(false)
                return response.json()
            })
            .catch(err => { console.log(err)}); 
            navigate('/teams')
        }
    }, [sentForm]);


    function handleInputChange(event) {
        const { target } = event;
        const { name, value} = target;
        const newValues = {
          ...values,
          [name]: value,
        };
    
        setValues(newValues);
    }


    function handleSelectedChange (event) {
      setSelected(event);
    };
   

    function handleSubmit(event) {
        event.preventDefault();
        setSentForm(!sentForm);
    }

    return (
        // TeamID    uuid.UUID `json:"team_id" db:"team_id"`
        // FirstName string    `json:"first_name" db:"first_name"`
        // LastName  string    `json:"last_name" db:"last_name"`
        // Role      string    `json:"role" db:"role"`
        // Rate     
       <Form title="Create a Employee" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700" htmlFor="name">Team ID</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">First Name</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Last Name</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Role</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="name">Rate</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
            </div>
       </Form>
    );
}
  
export default CreateEmployees;