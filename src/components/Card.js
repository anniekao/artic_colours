import React from 'react'
import useImageColor from 'use-image-color'
import hexSorter from 'hexsorter'

export default function Card({ artwork }) {
  const { colors } = useImageColor(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`, { cors: true, colors: 8 })
  const sortedColors = colors && hexSorter.sortColors(colors, 'mostBrightColor')

  const renderColours =() => (
    <div className='flex'>
      {sortedColors.map(color => (
        <div
          key={color}
          className='min-h-0 max-w-max py-14 flex items-end rounded'
          style={{ backgroundColor: `${color}` }}
        >
          <p className='text-xs'>{color}</p>
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