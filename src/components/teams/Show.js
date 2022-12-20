import { useState, useEffect } from "react";
import { useParams } from "react-router";


export default function TeamsShow() {

    const {teamId} = useParams()
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/teams/${teamId}`)
        .then(res => res.json())
        .then(({data}) => {
            setTeam(data[0])
        })
    },[]);

    return (
        <div> 
            <h3 className="text-3xl font-medium text-gray-700">Teams</h3>
            <div className="mt-8">
                <h4 className="text-gray-600">Member</h4>
                <p>Name: {team.name}</p>
                <p>Industry: {team.industry}</p>
            </div>            
        </div>
    )
}
