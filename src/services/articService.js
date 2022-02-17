import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'
const baseUrl = 'https://api.artic.edu/api/v1/artworks'
// Refer to the Art Institute of Chicago API docs for more information: https://api.artic.edu/docs/

const api = setupCache(Axios)

const getObjects = async () => {
  try {
    const res = await api.get(`${baseUrl}?page=1&limit=50&fields=id,title,artist_display,date_display,image_id,colorfulness,category_titles,is_public_domain`)
    return res.data
  } catch(err) {
    console.log(err)
  }
}

const getNextPage = async (nextUrl) => {
  console.log('NEXT URL', nextUrl)
  try {
    const res = await api.get(nextUrl)
    console.log('RES DATA', res.data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export default {
  getObjects,
  getNextPage
}