import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

// Refer to the MOMA Collection API docs for more information: https://metmuseum.github.io/

const instance =  Axios.create({ 
  baseURL: 'https://collectionapi.metmuseum.org',
})

const api = setupCache(instance)

const getAllObjects = async () => {
  try {
    const res = await api.get(`/public/collection/v1/objects`)
    return res.data.objectIDs
  } catch(err) {
    console.log(err)
  }
}

// deptIds can be given as a numeric string, e.g. "21" (Modern Art)
// or as a group of numeric strings separated by a pipe, e.g. "6|9|19" (Asian Art, Drawings and Prints, Photographs)
const getDepartmentCollection = async (deptIds) => {
  const res = await api.get(`/public/collection/v1/objects?departmentIds=${deptIds}`)
  return res.data.objectIDs
}

const getObject = async (objId) => {
  console.log("OBJECT ID", objId)
  try {
    const res = await api.get(`/public/collection/v1/objects/${objId}`)
    return res.data
  } catch(err) {
    console.log(err)
  }
}

// queryString should start with "?" with "&" between each following parameter, e.g. "?isHighlight=true&q=sunflowers"
// see MOMA Collection API docs under "Search" for valid parameters
const searchCollection = async (queryString) => {
  const res = await api.get(`/public/collection/v1/search${queryString}`)
  return res.data.objectIDs
}

export default {
  getAllObjects,
  getDepartmentCollection,
  getObject,
  searchCollection
}