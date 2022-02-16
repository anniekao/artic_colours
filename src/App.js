import React, { useEffect, useState } from 'react'
import articService from './services/articService.js'
import Card from './components/Card'

export default function App() {
  const [queryData, setQueryData] = useState(null)
  const [artworkData, setArtworkData] = useState([])

  useEffect(() => {
    async function getObjects() {
      const queryRes = await articService.getObjects()
      console.log('OBJECTS', queryRes)
      setQueryData(queryRes)
      // filter out artwork without an image
      const filteredArtwork = queryRes.data.filter(artwork => artwork.image_id && artwork.colorfulness > 20 && artwork.category_titles.includes('Photography and Media'))
      console.log('FILTERED ARTWORK', filteredArtwork)
      setArtworkData(filteredArtwork)
    }
    getObjects()
  }, [])

  console.log(queryData)
  console.log(artworkData[0])

  const renderArtworks = () => {
    return (
      <div>
        {artworkData.map(artwork => (
          <Card key={artwork.id} artwork={artwork} />
        ))}
      </div>
    )
  }

  return (
    <div>
      {artworkData && renderArtworks()}
    </div>
  )
}
