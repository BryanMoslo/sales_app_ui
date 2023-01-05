import {baseUrl} from "../utils/utils";
import {redirect} from "react-router-dom";

export async function action({ params }) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await  fetch(baseUrl(`offers/${params.id}`), options)


    if(!res.ok) throw res


    return redirect('/offers')
}