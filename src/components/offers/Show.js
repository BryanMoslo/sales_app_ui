import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";
import {useLoaderData} from "react-router-dom";
import Card from "../common/card";


export async function loader({ params }) {
    const res = await fetch(baseUrl(`offers/${params.id}`))

    if (!res.ok) throw res

    const { data } = await res.json()

    const [ offer ] = data

    const clientsRes = await fetch(`${baseUrl('clients')}`)


    if (!clientsRes.ok) throw clientsRes


    const  {data: clients } = await clientsRes.json()

    const client = clients.find(client => offer.client_id === client.id)


    return {
        ...offer,
        clientName: client.name
    }
}


export default function OffersShow() {
    const offer = useLoaderData()

    const o = {
        'Client Name': offer?.clientName,
        description: offer?.description,
        industry: offer?.industry
    }


    return <Card item={o} title={'Offer'} />

}