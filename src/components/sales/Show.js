import {baseUrl} from "../utils/utils";
import {useLoaderData} from "react-router-dom";
import Card from "../common/card";



export async function loader({ params }) {
    const res = await fetch(baseUrl(`sales/${params.id}`))

    if (!res.ok) throw res

    const { data } = await res.json()


    const [ sale ] = data

    const offersTeamsRes = await Promise.all([
        fetch(`${baseUrl('offers')}`).then(res => res.json()).then(({data}) => data),
        fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data}) => data),
    ])

    const [fetchedOffers, fetchedTeams] = offersTeamsRes

    const offer  = fetchedOffers.find(offer => offer.id === sale.offer_id)
    const team  = fetchedTeams.find(team => team.id === sale.team_id)

    return {
        ...sale,
        team: team.name,
        offer: offer.description,
    }
}


export default function SalesShow() {
    const sale = useLoaderData()

    const s = {
        id: sale?.id,
        team: sale?.team,
        offer: sale?.offer,
        price: sale?.price
    }

    return <Card title={'Sale'} item={s} />
}