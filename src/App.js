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
      const filteredArtwork = queryRes
        .data.filter(artwork => artwork.image_id && artwork.colorfulness > 20 && artwork.is_public_domain)
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
    <div className='container mx-auto'>
      <header className='container mx-auto flex justify-center'>
        <h1>Art Institute of Chicago Colour Palettes</h1>
      </header>
      <main className='columns-3 pt-8'>
        {artworkData && renderArtworks()}
      </main>
    </div>
  )
}
