import Form from "../common/form";
import {Option, Select} from "@material-tailwind/react";
import FormError from "../utils/formError";
import React, {useState} from "react";
import {baseUrl} from "../utils/utils";
import {redirect, useLoaderData} from "react-router-dom";


export async function action({ request }) {
    const formData = await request.formData()

    const sale = Object.fromEntries(formData)

    sale.price = Number(sale.price)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale)
    }

    const res =  await fetch(baseUrl('sales', 'create'), requestOptions)

    if (!res.ok) throw res


    return redirect('/sales')
}


export async function loader() {
    return await Promise.all([
       fetch(`${baseUrl('offers')}`).then(res => res.json()).then(({data}) => data),
       fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data}) => data),
   ])
}

export default function SalesCreate() {
    const [offers, teams] = useLoaderData()
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedOffer, setSelectedOffer] = useState('');
    const [price, setPrice] = useState(0);

    function handleSelectTeamChange(value) {
        setSelectedTeam(value)
    }

    function handleSelectOfferChange(value) {
        setSelectedOffer(value)
    }

    function handlePriceChange({ target }) {
        const { value } = target

        setPrice( Number(value))
    }


    const teamsOptions = [
        <Option key={'ssd324543'} disabled >{'Select a team'}</Option>,
        ...teams.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
    ]

    const offersOptions = [
        <Option key={'ssd324543'} disabled >{'Select an offer'}</Option>,
        ...offers.map(({id, description}) => <Option key={id} value={id}>{description}</Option>)
    ]

    return (
        <>
            <Form title="Create offer">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="team">Teams</label>
                        <div className="relative w-full mt-2 h-11">
                            <Select
                                name="team"
                                value={''}
                                variant="outlined"
                                className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                onChange={handleSelectTeamChange}
                                children={teamsOptions}
                            />
                            <input type="hidden" value={selectedTeam} name="team_id"/>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="offer">Offers</label>
                        <div className="relative w-full mt-2 h-11">
                            <Select
                                name="offer"
                                value={''}
                                variant="outlined"
                                className="w-full p-2.5 py-2 h-11 text-gray-500 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                onChange={handleSelectOfferChange}
                                children={offersOptions}
                            />
                            <input type="hidden" value={selectedOffer} name="offer_id"/>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="price">Price</label>
                        <div>
                            <input className="resize rounded-md w-full" placeholder={'0.00'} type="number" name="price" value={price === 0 ? '' : price} onChange={handlePriceChange}/>
                        </div>
                    </div>
                </div>
            </Form>
            <FormError errorMessage={''} />
        </>
    )
}