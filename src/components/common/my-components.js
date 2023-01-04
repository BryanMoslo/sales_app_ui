

export function Card({item = {}, title = ''}) {
    let items = []

    for (const key in item) {
        items.push(<div>{key}: {item[key]}</div>)
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







export default function MyComponents() {
    return (
        <>
            <Card item={{name: 'something', industry: 'insurance'}} />
        </>
    )
}