import Card from "../common/card";
import {baseUrl} from "../utils/utils";
import {useLoaderData} from "react-router-dom";


export async function loader({ params }) {
    const res = await fetch(baseUrl(`clients/${params.id}`))

    if (!res.ok) throw res

    const { data } = await res.json()

    const [ client ] = data


    return client
}

export default function ClientsShow() {
    const client = useLoaderData()

    const c = {
        id: client.id,
        name: client.name,
        'phone number': client.phone_number,
        rep: client.rep
    }

    return <Card item={c} title={'Client'} />
}
