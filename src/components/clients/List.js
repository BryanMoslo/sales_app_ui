import Table from "../common/table";
import {useState, useEffect} from "react";
import List from "../common/list";
import {Link } from "react-router-dom";

function ClientsList() {
    const baseUrl = 'http://localhost:3000/clients/';
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}`)
            .then(res => res.json())
            .then(({data}) => {
                setIsLoading(false)
                setClients([...clients, ...data])
            })
    }, []);


    return (
        <List isLoading={isLoading} title="Client" linkTo="/clients/create">
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
                            <Link to={client.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                            <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                        </td>

                    </tr>
                ))}
                </>
            </Table>
        </List>
  );
}

export default ClientsList;
