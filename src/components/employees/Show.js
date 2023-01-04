import {baseUrl, capitalizeFirst} from "../utils/utils";
import {useLoaderData} from "react-router-dom";
import Card from "../common/card";


export async function loader({ params }) {
    const res =  await fetch(baseUrl(`employees/${params.id}`))

    if (!res.ok) throw res

    const { data } = await res.json()

    const [ employee ] = data

    const teamsRes = await  fetch(baseUrl('teams'))

    if (!teamsRes.ok) throw teamsRes

    const {data: teams} = await teamsRes.json()

    const team = teams.find(({ id }) => id === employee.team_id);

    return {
        ...employee,
        teamName: team.name
    }
}

export default function EmployeesShow() {
    const employee = useLoaderData()

    const e  = {
        id: employee?.id,
        'First Name': employee?.first_name,
        'Last Name': employee?.last_name,
        'Team Name': employee?.teamName ? employee?.teamName : '-',
        role: employee?.role ? capitalizeFirst(employee?.role) : '-',
        rate: employee?.rate
    }

    return <Card item={e} title={'Employee'} />
}
