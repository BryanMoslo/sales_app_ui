import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import {redirect, useNavigate} from 'react-router-dom';
import Form from "../common/form";
import {baseUrl} from "../utils/utils";


export async function action({ request }) {
    const formData = await request.formData()

    const team = Object.fromEntries(formData)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };

    const res = await fetch(baseUrl('teams', 'create'), requestOptions)

    if (!res.ok) throw res

    return redirect('/teams')
}

export default function TeamsCreate () {
    const [selectedIndustry, setSelectedIndustry] = useState('health');
    const [values, setValues] = React.useState({
      name: '',
    });

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
        setSelectedIndustry(event);
    }

    return (

       <Form title="Create a team">
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700" htmlFor="name">Name</label>
                    <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="text-gray-700" htmlFor="industry" >Industry</label>
                    <div className="relative w-full mt-2 h-11">
                        <Select name="industry" onChange={handleSelectedChange} value={selectedIndustry} variant="outlined" className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                            <Option disabled >Select an industry</Option>
                            <Option value="health" >Health</Option>
                            <Option value="insurance" >Insurance</Option>
                            <Option value="entertainment" >Entertainment</Option>
                        </Select>
                        <input type="hidden" name="industry" value={selectedIndustry}/>
                    </div>
                </div>
            </div>
       </Form>
    );
}