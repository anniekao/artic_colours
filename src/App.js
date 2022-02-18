import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import PageNav from './components/PageNav.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useDataService } from './hooks/useDataService.js'

export default function App() {
  const initialUrlQuery='https://api.artic.edu/api/v1/artworks?page=1&limit=30&fields=id,title,artist_title,date_display,place_of_origin,image_id,colorfulness,category_titles,is_public_domain'
  const [apiUrl, setApiUrl] = useState(initialUrlQuery)
  const { artworks, pagination } = useDataService(apiUrl)

  useEffect(() => {
    document.title = 'ArtIC Colour Palettes'
  })

  const renderArtworks = () => {
    return (
      <>
        {artworks.map(artwork => (
          <Card key={artwork.id} artwork={artwork} />
        ))}
      </>
    )
  }

  const handlePagination = (type) => {
    let url
    switch(type) {
    case 'next':
      url = pagination.next_url
      break
    case 'prev':
      url = pagination.prev_url
      break
    }
    setApiUrl(url)
  }

  // Switch to a two-column grid when there are less than five items in artworkData
  // Prevents cards from being broken up over several columns
  const handleFewItemsLayout = () => {
    if (artworks.length < 5) {
      return 'masonry lg:masonry-lg'
    } else {
      return 'masonry lg:masonry-lg xl:masonry-xl'
    }
  }
  let mainGridLayout = artworks && handleFewItemsLayout()

  return (
    <>
      <div className='container mx-auto pt-20 pb-20 pr-4 pl-4 text-slate-800'>
        <header className='container p-2 pb-20 mx-auto'>
          <h1 className='font-header font-extrabold sm:text-8xl text-7xl pb-8'>
            ArtIC Colour Palettes <br />
          </h1>
          <p className='font-sans'>
            Explore colour palettes generated from artworks in the Art Institute of Chicago's collection using their open source API.
          </p>
        </header>
        <div className='mb-20'>
          <PageNav changePage={handlePagination} />
        </div>
        <main className='flex justify-center'>
          <div className={mainGridLayout}>
            {artworks && renderArtworks()}
          </div>
        </main>
        <div className='mt-20'>
          <PageNav changePage={handlePagination} />
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
