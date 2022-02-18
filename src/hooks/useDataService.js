import { useState, useEffect } from 'react'
import { filterArtwork } from '../helpers/helpers.js'
import articService from '../services/articService'

export const useDataService = (url) => {
  const [pagination, setPagination] = useState([])
  const [artworks, setArtworksData] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if(!url) {
    return
  }

  useEffect(() => {
    setIsLoading(true)
    async function getData(){
      try{
        const queryRes = await articService.getObjects(url)
        setPagination(queryRes.pagination)
        const filteredArtwork = filterArtwork(queryRes.data)
        setArtworksData(filteredArtwork)
      }catch(err) {
        setError(err)
      }
    }
    getData()
  }, [url])

  return { artworks, pagination, error, isLoading }
}
