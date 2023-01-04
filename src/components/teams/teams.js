import {baseUrl} from "../utils/utils";

export default async function loader() {
  const response = await fetch(baseUrl('teams'))

  if (response.status === 404) {
    throw new Response('This page does not exists', {status: 404})
  }

  const json = await response.json()


  return json.data
}