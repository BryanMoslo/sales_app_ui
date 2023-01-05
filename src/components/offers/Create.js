import Form from "../common/form";
import {Option, Select} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";
import React from 'react'
import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import FormError from "../utils/formError";

export async function action ({ request }) {
    const formData = await request.formData()

    const offer = Object.fromEntries(formData)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
    }

    const res = await  fetch(baseUrl('offers', 'create'), requestOptions)

    if (!res.ok) throw res


    return redirect('/offers')

}

export default function OffersCreate() {
    const clients = useLoaderData()
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');

    function handleSelectIndustryChange(value) {
        setSelectedIndustry(value)
    }
    function handleSelectClientChange(value) {
        setSelectedClient(value)
    }

    function handleTextAreaChange(e) {
        const { target } = e
        const { value } = target

        setTextAreaValue(value)
    }

    const clientsOptions = [
        <Option key={'ssd324543'} disabled >{'Select a client'}</Option>,
        ...clients.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
    ]


    return (
        <>
            <Form title="Create offer">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="client">Client</label>
                        <div className="relative w-full mt-2 h-11">
                            <Select
                                name="client"
                                value={''}
                                variant="outlined"
                                className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                onChange={handleSelectClientChange}
                                children={clientsOptions}
                            />
                            <input type="hidden" name="client_id" value={selectedClient}/>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="industry" >Industry</label>
                        <div className="relative w-full mt-2 h-11">
                            <Select
                                name="industry"
                                value={selectedIndustry}
                                variant="outlined"
                                className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                onChange={handleSelectIndustryChange}
                            >
                                <Option disabled>Select an industry</Option>
                                <Option value="health" >Health</Option>
                                <Option value="insurance" >Insurance</Option>
                                <Option value="entertainment" >Entertainment</Option>
                            </Select>
                            <input type="hidden" name="industry" value={selectedIndustry}/>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="description">Description</label>
                        <div>
                            <textarea className="resize rounded-md w-full" name="description" value={textAreaValue} rows={3} onChange={handleTextAreaChange}/>
                        </div>
                    </div>
            </div>
            </Form>
            <FormError errorMessage={''} />
        </>
    )
}