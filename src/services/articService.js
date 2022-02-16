import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

// Refer to the Art Institute of Chiago API docs for more information: https://api.artic.edu/docs/

const instance =  Axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks',
})

const api = setupCache(instance)

const getObjects = async () => {
  try {
    const res = await api.get('?page=1&limit=100&fields=id,title,artist_display,date_display,image_id,color,colorfulness,category_titles')
    return res.data
  } catch(err) {
    console.log(err)
  }
}

export default {
  getObjects
}