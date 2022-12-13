import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function CreateATeam () {

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
            fetch('http://localhost:3000/teams/create', requestOptions)
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

        <div>
            <h3 className="text-3xl font-medium text-gray-700">Create a Team</h3>
            <div className="mt-4">
            <div className="p-6 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 capitalize">
                  Account settings
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700" htmlFor="name">Name</label>
                            <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label className="text-gray-700" htmlFor="industry" >Industry</label>
                            <div className="relative w-full mt-2 h-11">
                                <Select name="industry" onChange={handleSelectedChange} value={selected} variant="outlined" className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                                    <Option disabled >Select an industry</Option>
                                    <Option value="health" >Health</Option>
                                    <Option value="insurance" >Insurance</Option>
                                    <Option value="entertainment" >Entertainment</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">

                            <button className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Save
                            </button>

                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}
  
export default CreateATeam;