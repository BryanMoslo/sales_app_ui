import Table from "../common/table";
import {Link} from "react-router-dom";
import List from "../common/list";



export default function SalesList() {
    const sales = [
        {id: 'w324'},
        {id: 'd3234'},
        {id: 'dq324'},
    ]

    const currentDeleted = ''
    const deletingClass = ''



  return (
      <List isLoading={false} title="sales" linkTo="/sales/create">
          <Table columns={['#','Offer', 'Team', 'Price']}>
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
                                  {sale?.offer_id ? sale?.offer_id : '-'}
                              </div>
                          </td>

                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  {sale?.team_id ? sale?.team_id : '-'}
                              </div>
                          </td>

                          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                              <div className="text-sm leading-5 text-gray-900">
                                  {sale?.price ? sale?.price : '-'}
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
