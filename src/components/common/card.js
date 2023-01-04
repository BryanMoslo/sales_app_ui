import {capitalizeFirst} from "../utils/utils";


export default function Card({item = {}, title = ''}) {
    let items = []

    for (const key in item) {
         if (key === 'id' || key === 'created_at' || key === 'updated_at')  continue

        items.push(<div key={key}>{capitalizeFirst(key)}: {item[key]}</div>)
    }
    
    return (
        <div className="w-1/2 bg-white text-center p-3 rounded-md shadow-xl m-auto">
            <h3 className="py-3 text-2xl">{title}</h3>
            <div className="text-left pl-2">
                {
                     items
                }
            </div>
        </div>
    )
}