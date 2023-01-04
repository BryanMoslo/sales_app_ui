import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {Card} from "../common/my-components";


export default function ClientsShow() {

    const {clientId} = useParams()
    const [client, setclient] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/clients/${clientId}`)
        .then(res => res.json())
        .then(({data}) => {
            setclient(data[0])
        })
    },[]);

    const c = {
        name: client.name,
        'phone number': client.phone_number,
        rep: client.rep
    }

    return <Card item={c} title={'Client'} />
}
