import List from "../common/list";
import Table from "../common/table";
import {Link} from "react-router-dom";
import {baseUrl, industryColor} from "../utils/utils";
import {useEffect, useState} from "react";

export default function OffersList() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDeleted, setCurrentDeleted] = useState('')
    const deletingClass = 'opacity-20'

    useEffect(() => {
        fetch(`${baseUrl('offers')}`)
            .then(res => res.json())
            .then(({data}) => {
                setOffers([...offers, ...data])
            })
    }, []);


    useEffect(() => {
        if (offers.length > 0 && isLoading) {
            fetch(`${baseUrl('clients')}`)
                .then(res => res.json())
                .then(({data}) => {
                    setOffers(offers.map(offer =>  {
                        const o = data.find(client => offer.client_id === client.id)
                        return {
                            ...offer,
                            clientName: o.name
                        }
                    }))
                    setIsLoading(false)
                })
        }

    }, [offers]);


    useEffect(() => {
        let ignore = false;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        if (!ignore && currentDeleted !== '') {
            fetch(`${baseUrl('offers', currentDeleted)}`, options)
                .then(res => {
                    if (res.ok) {
                        setOffers(offers.filter(o => o.id !== currentDeleted))
                        setCurrentDeleted('')
                    }
                })
                .catch(err => console.error(err))
        }

        return () => {
            ignore = true
        }
    }, [currentDeleted, offers]);

    function handleDeleteOffers(e) {
        e.preventDefault()

        const { target } = e;
        const { dataset } = target;
        const { id:salesId } = dataset;

        setCurrentDeleted(salesId)
    }

    return (
        <List isLoading={isLoading} title="offer" linkTo="/offers/create">
            <Table columns={['#','Client', 'Description', 'Industry']}>
                <>
                    {offers.map((offer, i) => (
                        <tr key={offer.id} className={offer.id === currentDeleted ? deletingClass : ''}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    <Link to={offer.id}>{i+1}</Link>
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {offer?.clientName ? offer.clientName : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {offer?.description ? offer.description : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <span className={`capitalize inline-flex px-2 text-xs font-semibold leading-5 ${industryColor(offer?.industry)} rounded-full`}>
                                        {offer?.industry ? offer.industry : '-'}
                                    </span>
                            </td>


                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                <Link to={offer.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                                <button className="text-red-600 hover:text-red-900" data-id={offer.id} onClick={handleDeleteOffers}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
    );
}
