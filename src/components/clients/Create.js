import Form from "../common/form";
import { useState } from "react";
import { redirect } from "react-router-dom";
import FormError from "../utils/formError";
import { baseUrl } from "../utils/utils";


export async function action({ request }) {
    const formData = await request.formData()
    const clientSubmitted = Object.fromEntries(formData)

    const client = {
        ...clientSubmitted,
        phone_number: clientSubmitted.phone.replaceAll('-', '')
    }

    delete client.phone

    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    };

    const res = await fetch(baseUrl('clients/create'), options)

    if (!res.ok) throw res

   return redirect('/clients')
}



export default function Create() {
    const initialForm = {name: '', phone: '', rep: ''}
    const [client, setClient] = useState(initialForm)
    

    function handleInputChange(e) {
        const { target } = e
        const { name, value } = target
        setClient({...client, [name]: value})
    }

    return (

        <>
            <Form title="Create a client">
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
            <FormError errorMessage={''} />
        </>
    )
}