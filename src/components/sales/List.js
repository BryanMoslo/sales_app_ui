import Table from "../common/table";
import {Link} from "react-router-dom";
import List from "../common/list";
import {useEffect, useState} from "react";
import {baseUrl} from "../utils/utils";



export default function SalesList() {

    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentDeleted = ''
    const deletingClass = ''


    useEffect(() => {
        fetch(`${baseUrl('sales')}`)
            .then(res => res.json())
            .then(({data}) => {
                setSales([...sales, ...data])
            })
    }, []);


    useEffect(() => {
        if (sales.length > 0  && isLoading) {
            Promise.all([
                fetch(`${baseUrl('offers')}`).then(res => res.json()).then(({data}) => data),
                fetch(`${baseUrl('teams')}`).then(res => res.json()).then(({data}) => data),
            ]).then(res => {
                const [fetchedOffers, fetchedTeams] = res

                setSales(sales.map(sale =>  {
                    const offer  = fetchedOffers.find(offer => offer.id === sale.offer_id)
                    const team  = fetchedTeams.find(team => team.id === sale.team_id)

                    return {
                        ...sale,
                        team: team.name,
                        offer: offer.description,
                    }
                }))
                setIsLoading(false)
            }).catch(err => console.error(err))
        }

    }, [sales]);



  return (
      <List isLoading={isLoading} title="sales" linkTo="/sales/create">
          <Table columns={['#','Team', 'Offer', 'Price']}>
              <>
                  {sales.map((sale, i) => (
                      <tr key={sale.id} className={sale.id === currentDeleted ? deletingClass : ''}>
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
                              <Link to={sale.id} className="text-indigo-600 hover:text-indigo-900 mr-2">View</Link>
                              <button className="text-red-600 hover:text-red-900" data-id={sale.id}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </>
          </Table>
      </List>
  );
}
