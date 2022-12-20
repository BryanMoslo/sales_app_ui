import Form from "../common/form";
import {Option, Select} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";
import React from 'react'
import {useNavigate} from "react-router-dom";
import FormError from "../utils/formError";

export default function OffersCreate() {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [sentForm, setSentForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`${baseUrl('clients')}`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setClients([...clients, ...data])
            })
    }, []);


    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: selectedClient,
                description: textAreaValue,
                industry: selectedIndustry
            })
        }

        if (sentForm) {
            fetch(`${baseUrl('offers', 'create')}`, requestOptions)
                .then((res) => {
                    setSentForm(false)

                    if (res.ok) {
                        navigate('/offers')
                    }

                    return res.json()
                })
                .then(res => {
                    const {status, message} = res

                    if (status !== 201) {
                        setErrorMessage(message ?? res)
                    }
                })
                .catch(err => {
                    setErrorMessage(err)
                });
        }
    }, [sentForm]);

    function handleSelectIndustryChange(e) {
        setSelectedIndustry(e)
    }
    function handleSelectClientChange(e) {
        setSelectedClient(e)
    }

    function handleTextAreaChange(e) {
        const { target } = e
        const { value } = target

        setTextAreaValue(value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        setSentForm(true)
    }

    const clientsOptions = [
        <Option key={'ssd324543'} disabled >{isLoading ? 'loading clients...' : 'Select a client'}</Option>,
        ...clients.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
    ]


    return (
        <>
            <Form title="Create offer" onSubmit={handleSubmit}>
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
            <FormError errorMessage={errorMessage} />
        </>
    )
}