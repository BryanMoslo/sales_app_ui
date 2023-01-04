import {baseUrl} from "../utils/utils";
import {redirect} from "react-router-dom";

export async function action({ params }) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    await fetch(baseUrl('clients',params.id), options)

    return redirect('/clients')
}