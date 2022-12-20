import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";

export default function OffersShow() {
    const {offerId} = useParams()
    const [offer, setOffer] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl('offers', offerId)}`)
            .then(res => res.json())
            .then(({data}) => {
                const [o] = data
                setOffer(o)
            })
    }, []);

    useEffect(() => {
        if (offer?.id && isLoading) {
            fetch(`${baseUrl('clients')}`)
                .then(res => res.json())
                .then(({data}) => {
                    const client = data.find(client => offer.client_id === client.id)

                    setOffer({
                            ...offer,
                            clientName: client.name
                    })
                    setIsLoading(false)
                })
        }

    }, [offer]);

    return (
        <div>
            <h3 className="text-3xl font-medium text-gray-700">Offers</h3>
            <div className="mt-8">
                <p>Team: {offer.clientName}</p>
                <p>Offer: {offer.description}</p>
                <p>Industry: {offer.industry}</p>
            </div>
        </div>
    )
}