import React, { useEffect, useState } from 'react'
import { IoChevronForwardOutline, IoChevronBack } from 'react-icons/io5'
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
    console.log('GET NEXT PAGE URL', pageUrl)
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
    <div className='flex flex-row'>
      <div className='h-screen fixed flex bg-slate-300 hover:bg-slate-200 duration-150 invisible sm:visible'>
        <button type="button" onClick={(e) => handlePrevPage(e)} className='text-slate-400'>
          <IoChevronBack size={120} />
        </button>
      </div>
      <div className='container mx-auto pt-20 pb-20 text-slate-800'>
        <header className='container p-2 pb-20 mx-auto'>
          <h1 className='font-header font-extrabold text-8xl pb-8'>
            Artful Colour <br /> Palettes
          </h1>
          <p className='font-sans'>
            Explore colour palettes generated from images of works of art found in the Art Institute of Chicago's extensive collection.
          </p>
        </header>
        <main>
          <div className='masonry sm:masonry-sm md:masonry-md'>
            {artworkData && renderArtworks()}
          </div>
        </main>
      </div>
      <div className='h-screen fixed flex right-0 top-0 bg-slate-300 hover:bg-slate-200 duration-150 invisible sm:visible'>
        <button type="button" onClick={(e) => handleNextPage(e)} className='text-slate-400'>
          <IoChevronForwardOutline size={120} />
        </button>
      </div>
    </ div>
  )
}
