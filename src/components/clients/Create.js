import Form from "../common/form";
import {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import {redirect, useNavigate} from "react-router-dom";
import FormError from "../utils/formError";

const baseUrl = `http://localhost:3000/clients`


export default function Create() {
    const initialForm = {name: '', phone: '', rep: ''}
    const [client, setClient] = useState(initialForm)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        if(isSubmitted) {
            const sanitizedNumber = client.phone.replaceAll('-', '')

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: client.name,
                    phone_number: sanitizedNumber,
                    rep: client.rep
                })
            };

            fetch(`${baseUrl}/create`, options)
                .then(res => {
                    setIsSubmitted(false)

                    if (res.ok) {
                        navigate('/clients')
                    }

                    return res.json()
                })
                .then(res => {
                    const {status, message} = res

                    if (status === 422) {
                        setErrorMessage(message)
                    }
                })
                .catch(err => console.error(err))
        }


    }, [isSubmitted]);
    

    function handleInputChange(e) {
        const { target } = e
        const { name, value } = target
        setClient({...client, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        setIsSubmitted(true)
    }


    return (

        <>
            <Form title="Create a client" onSubmit={handleSubmit} >
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="name">Name</label>
                        <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="name" value={client.name} placeholder="Client Name" onChange={handleInputChange}/>
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="name">Phone Number</label>
                        <input
                            className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            type="text"
                            name="phone"
                            value={client.phone}
                            placeholder="000-000-0000"
                            onChange={handleInputChange}/>
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="name">Rep</label>
                        <input className="w-full mt-2 h-11 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" name="rep" value={client.rep} placeholder="Rep" onChange={handleInputChange}/>
                    </div>
                </div>
            </Form>
            <FormError errorMessage={errorMessage} />
        </>
    )
}