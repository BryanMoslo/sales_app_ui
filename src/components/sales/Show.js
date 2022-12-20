import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";

export default function SalesShow() {
    const {saleId} = useParams()
    const [sale, setSale] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch(`${baseUrl('sales', saleId)}`)
            .then(res => res.json())
            .then(({data}) => {
                const [s] = data

                setSale(s)
            })
    },[]);

    useEffect(() => {
        if (sale?.id  && isLoading) {
            Promise.all([
                fetch(`${baseUrl('offers')}`).then(res => res.json()).then(({data}) => data),
                fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data}) => data),
            ]).then(res => {
                const [fetchedOffers, fetchedTeams] = res

                const offer  = fetchedOffers.find(offer => offer.id === sale.offer_id)
                const team  = fetchedTeams.find(team => team.id === sale.team_id)

                setSale({
                        ...sale,
                        team: team.name,
                        offer: offer.description,
                })
                setIsLoading(false)
            }).catch(err => console.error(err))
        }

    }, [sale]);

    return (
        <div>
            <h3 className="text-3xl font-medium text-gray-700">Sales</h3>
            <div className="mt-8">
                <p>Team: {sale.team}</p>
                <p>Offer: {sale.offer}</p>
                <p>Price: {sale.price}</p>
            </div>
        </div>
    )
}