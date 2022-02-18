import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'
// Refer to the Art Institute of Chicago API docs for more information: https://api.artic.edu/docs/

const api = setupCache(Axios)

const getObjects = async (url) => {
  try {
    const res = await api.get(url)
    return res.data
  } catch(err) {
    console.log(err)
  }
}

export default {
  getObjects
}