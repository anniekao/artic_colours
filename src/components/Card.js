import React from 'react'
import useImageColor from 'use-image-color'

export default function Card({ artwork }) {
  const { colors } = useImageColor(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`, { cors: true, colors: 5 })

  const renderColours =() => (
    <div className='flex'>
      {colors.map(color => (
        <div
          key={color}
          className='mr-2 last:mr-0 flex items-end rounded'
          style={{ backgroundColor: `${color}`, height: '100px', width: '100px' }}
        >
          <p>{color}</p>
        </div>
      ))}
    </div>
  )

  return (
    <article className='mb-20 mr-8 last:m-0 p-4 border-solid border border-slate-200 shadow-2xl rounded'>
      <figure>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`}
          alt={artwork.title}
        />
        <figcaption>{artwork.title} - {artwork.artist_display}</figcaption>
      </figure>
      {colors && renderColours()}
    </article>
  )
}