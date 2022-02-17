import React, { useEffect, useState } from 'react'
import articService from './services/articService.js'
import Card from './components/Card'
import PageNav from './components/PageNav.js'

export default function App() {
  const [queryData, setQueryData] = useState(null)
  const [artworkData, setArtworkData] = useState([])

  useEffect(() => {
    document.title = 'Artful Colour Palettes'
  })

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
    console.log('GET NEXT PAGE URL', pageUrl)
    try{
      const queryRes = await articService.getNextPage(pageUrl)
      setQueryData(queryRes)
      const filteredArtwork = filterArtwork(queryRes.data)
      console.log('NEXT FILTERED', filteredArtwork)
      setArtworkData(filteredArtwork)
    } catch(err) {
      console.log(err)
    }

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

  const handleNextPage = event => {
    const nextPage = queryData.pagination.next_url ? queryData.pagination.next_url : ''
    event.preventDefault()
    getNextPage(nextPage)
  }

  const handlePrevPage = event => {
    event.preventDefault()
    const prevPage = queryData.pagination.prev_url ? queryData.pagination.prev_url : ''
    getNextPage(prevPage)
  }

  return (
    <div className='container mx-auto pt-20 pb-20 text-slate-800'>
      <header className='container p-2 pb-20 mx-auto'>
        <h1 className='font-header font-extrabold sm:text-8xl text-7xl pb-8'>
            Artful Colour <br /> Palettes
        </h1>
        <p className='font-sans'>
            Explore colour palettes generated from artworks in the Art Institute of Chicago's collection.
        </p>
      </header>
      <div className='mb-20'>
        <PageNav handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </div>
      <main className='flex justify-center'>
        <div className='masonry sm:masonry-sm lg:masonry-lg'>
          {artworkData && renderArtworks()}
        </div>
      </main>
      <div className='mt-20'>
        <PageNav handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </div>
    </div>

  )
}
