import React, { useEffect, useState } from 'react'
import articService from './services/articService.js'
import Card from './components/Card'

export default function App() {
  const [queryData, setQueryData] = useState(null)
  const [artworkData, setArtworkData] = useState([])

  const filterArtwork = (artworks) => {
    return artworks.filter(artwork => artwork.image_id && artwork.colorfulness > 20)
  }

  useEffect(() => {
    async function getObjects() {
      const queryRes = await articService.getObjects()
      console.log('OBJECTS', queryRes)
      setQueryData(queryRes)
      const filteredArtwork = filterArtwork(queryRes.data)
      console.log('FILTERED ARTWORK', filteredArtwork)
      setArtworkData(filteredArtwork)
    }
    getObjects()
  }, [])

  console.log(queryData)
  console.log(artworkData[0])

  const getNextPage = async (pageUrl) => {
    const queryRes = await articService.getNextPage(pageUrl)
    setQueryData(queryRes)
    const filteredArtwork = filterArtwork(queryRes.data)
    console.log('NEXT FILTERED', filteredArtwork)
    setArtworkData(filteredArtwork)

  }
  const renderArtworks = () => {
    return (
      <>
        {artworkData.map(artwork => (
          <Card key={artwork.id} artwork={artwork} />
        ))}
      </>
    )
  }

  const handleNextPage = () => {
    const nextPage = queryData.pagination.next_url
    getNextPage(nextPage)
  }

  return (
    <div className='container mx-auto pt-10 text-slate-800'>
      <header className='container p-2 pb-20 mx-auto'>
        <h1 className='font-header font-extrabold text-8xl pb-8'>
          Artful Colour <br /> Palettes
        </h1>
        <p className='font-sans'>
          Explore colour palettes generated from works of art found in the Art Institute of Chicago's extensive collection.
        </p>
      </header>
      <main>
        <button type="button" onClick={handleNextPage}>
          Next Page
        </button>
        <div className='masonry sm:masonry-sm md:masonry-md'>
          {artworkData && renderArtworks()}
        </div>
      </main>
    </div>
  )
}
