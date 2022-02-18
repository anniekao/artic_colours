import React, { useEffect, useState } from 'react'
import articService from './services/articService.js'
import Card from './components/Card'
import PageNav from './components/PageNav.js'
import { filterArtwork } from './helpers/helpers.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function App() {
  const [queryData, setQueryData] = useState(null)
  const [artworkData, setArtworkData] = useState([])

  useEffect(() => {
    document.title = 'Artful Colour Palettes'
  })

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

  // Switch to a two-column grid when there are less than five items in artworkData
  // Prevents cards from being broken up over several columns
  const handleFewItemsLayout = () => {
    if (artworkData.length < 5) {
      return 'masonry lg:masonry-lg'
    } else {
      return 'masonry lg:masonry-lg xl:masonry-xl'
    }
  }
  let mainGridLayout = handleFewItemsLayout()

  return (
    <>
      <div className='container mx-auto pt-20 pb-20 pr-4 pl-4 text-slate-800'>
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
          <div className={mainGridLayout}>
            {artworkData && renderArtworks()}
          </div>
        </main>
        <div className='mt-20'>
          <PageNav handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
        </div>
        <ToastContainer
          toastClassName='bg-slate-800 relative flex p-1 w-100 rounded-md justify-between overflow-hidden cursor-pointer'
          bodyClassName='text-sm font-white font-med block p-3 text-center'
          position='bottom-center'
          autoClose={2000}
          hideProgressBar={true}
        />
      </div>
    </>
  )
}
