import Form from "../common/form";
import {Option, Select} from "@material-tailwind/react";
import FormError from "../utils/formError";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";

export default function SalesCreate() {
    const [teams, setTeams] = useState([])
    const [offers, setOffers] = useState([])
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedOffer, setSelectedOffer] = useState('');
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [sentForm, setSentForm] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${baseUrl('teams')}`)
            .then(res => res.json())
            .then(({data}) => {
                setTeams([...teams, ...data])
            })
    }, []);

    useEffect(() => {
        fetch(`${baseUrl('offers')}`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setOffers([...offers, ...data])
            })
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                team_id: selectedTeam,
                offer_id: selectedOffer,
                price: price
            })
        }

        if (sentForm) {
            fetch(`${baseUrl('sales', 'create')}`, requestOptions)
                .then((res) => {
                    setSentForm(false)

                    if (res.ok) {
                        navigate('/sales')
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


    function handleSubmit(e) {
        e.preventDefault()

        setSentForm(true)
    }

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
        <Option key={'ssd324543'} disabled >{isLoading ? 'loading teams...' : 'Select a team'}</Option>,
        ...teams.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
    ]

    const offersOptions = [
        <Option key={'ssd324543'} disabled >{isLoading ? 'loading offers...' : 'Select an offer'}</Option>,
        ...offers.map(({id, description}) => <Option key={id} value={id}>{description}</Option>)
    ]

    return (
        <>
            <Form title="Create offer" onSubmit={handleSubmit}>
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
            <FormError errorMessage={errorMessage} />
        </>
    )
}