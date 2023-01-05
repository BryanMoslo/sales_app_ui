import Table from "../common/table";
import List from "../common/list";
import {baseUrl} from "../utils/utils";
import {Form, Link, useFetcher, useLoaderData} from "react-router-dom";


export async function loader() {
    const res  =  await fetch(`${baseUrl('clients')}`)
    const {data: clients} = await res.json()

    return clients
}


function ClientsList() {
    const clients = useLoaderData()
    const fetcher = useFetcher()

    return (
        <List isLoading={false} title="Client" linkTo="/clients/create">
            <Table title={'Client List'} columns={['#', 'Name', 'Phone Number', 'Rep']} className="text-center">
                <>
                {clients.map((client, i) => (
                    <tr key={client.id}>
                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <div className="text-sm leading-5 text-gray-900">
                                <Link to={client.id}>{i+1}</Link>
                            </div>
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <div className={`capitalize text-sm leading-5 text-gray-900`}>
                                {client?.name ? client?.name : '-'}
                            </div>
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <span className="text-sm leading-5 text-gray-900">
                                {client?.phone_number ? client?.phone_number : '-'}
                            </span>
                        </td>

                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                            <span className={`capitalize text-sm leading-5 text-gray-900`}>
                                {client?.rep ? client?.rep : '-'}
                            </span>
                        </td>

                        <td className="px-6 py-4 font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                            <Link to={client.id} className="text-indigo-600 hover:text-indigo-900 text-sm mr-2">View</Link>
                            <fetcher.Form method="delete" action={`${client.id}/destroy`} className="inline-block">
                                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                            </fetcher.Form>
                        </td>

                    </tr>
                ))}
                </>
            </Table>
        </List>
  );
}

export default ClientsList;
