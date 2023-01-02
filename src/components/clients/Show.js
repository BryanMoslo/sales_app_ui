import { useState, useEffect } from "react";
import { useParams } from "react-router";


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

    return (
        <div> 
            <h3 className="text-3xl font-medium text-gray-700">Clients</h3>
            <div className="mt-8">
                <h4 className="text-gray-600">Member</h4>
                <p>Name: {client.name}</p>
                <p>Phone Number: {client.phone_number}</p>
                <p>REP: {client.rep}</p>
            </div>            
        </div>
    )
}
