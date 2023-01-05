import List from "../common/list";
import Table from "../common/table";
import {Link, useFetcher, useLoaderData} from "react-router-dom";
import {baseUrl, industryColor} from "../utils/utils";


export async function loader() {
    const res =  await fetch(baseUrl('offers'))

    if (!res.ok) throw  res

    const {data: offers} = await res.json()

    const clientsRes = await  fetch(baseUrl('clients'))

    if (!clientsRes.ok) throw  clientsRes

    const {data: clients} = await clientsRes.json()


    return offers?.map(offer =>  {
        const o = clients.find(client => offer.client_id === client.id)
        return {
            ...offer,
            clientName: o.name
        }
    })
}


export default function OffersList() {
    const offers = useLoaderData()
    const fetcher = useFetcher()

    return (
        <List  title="offer" linkTo="/offers/create">
            <Table columns={['#','Client', 'Description', 'Industry']}>
                <>
                    {offers.map((offer, i) => (
                        <tr key={offer.id}>
                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    <Link to={offer.id}>{i+1}</Link>
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {offer?.clientName ? offer.clientName : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div className="text-sm leading-5 text-gray-900">
                                    {offer?.description ? offer.description : '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <span className={`capitalize inline-flex px-2 text-xs font-semibold leading-5 ${industryColor(offer?.industry)} rounded-full`}>
                                        {offer?.industry ? offer.industry : '-'}
                                    </span>
                            </td>


                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                <Link to={offer.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                                <fetcher.Form method="delete" action={`${offer?.id}/destroy`} className="inline-block">
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </fetcher.Form>
                            </td>
                        </tr>
                    ))}
                </>
            </Table>
        </List>
    );
}
