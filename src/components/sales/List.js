import Table from "../common/table";
import {Link, useFetcher, useLoaderData} from "react-router-dom";
import List from "../common/list";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";



export async function loader() {
    const res = await  fetch(baseUrl('sales'))

    if (!res.ok) throw res

    const {data: sales} = await res.json()

    const offersTeamsRes =  await Promise.all([
        fetch(`${baseUrl('offers')}`).then(res => res.json()).then(({data}) => data),
        fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data}) => data),
    ])

    const [fetchedOffers, fetchedTeams] = offersTeamsRes


    return sales.map(sale =>  {
        const offer  = fetchedOffers.find(offer => offer.id === sale.offer_id)
        const team  = fetchedTeams.find(team => team.id === sale.team_id)

        return {
            ...sale,
            team: team?.name,
            offer: offer?.description,
        }
    })
}


export default function SalesList() {
    const sales = useLoaderData()
    const fetcher = useFetcher()

  return (
      <List title="sales" linkTo="/sales/create">
          <Table columns={['#','Team', 'Offer', 'Price']}>
              <>
                  {sales.map((sale, i) => (
                      <tr key={sale.id}>
                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  <Link to={sale.id}>{i+1}</Link>
                              </div>
                          </td>

                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  {sale?.team ? sale.team : '-'}
                              </div>
                          </td>

                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  {sale?.offer ? sale.offer : '-'}
                              </div>
                          </td>

                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  {sale?.price ? sale.price : '-'}
                              </div>
                          </td>


                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                              <Link to={sale?.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                              <fetcher.Form method="delete" action={`${sale?.id}/destroy`} className="inline-block">
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
