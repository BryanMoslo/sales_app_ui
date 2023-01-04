import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useLoaderData} from "react-router-dom";
import {baseUrl} from "../utils/utils";
import Card from "../common/card";



export async function loader({ params }) {
    const res = await fetch(baseUrl(`teams/${params.id}`))

    if (!res.ok) throw res

    const { data } = await res.json()

    const [ team ] = data

    return team

}

export default function TeamsShow() {
    const team = useLoaderData()


    return <Card item={team} title={'Member'} />

}
