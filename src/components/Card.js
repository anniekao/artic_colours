import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import hexSorter from 'hexsorter'
import { usePalette } from 'react-palette'

export default function Card({ artwork }) {
  const imgUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`
  const { data } = usePalette(imgUrl)
  const colors = Object.keys(data).map(k => (data[k]))
  const sortedColors = colors && hexSorter.sortColors(colors, 'mostBrightColor')

  const renderColours =() => (
    <div className='flex flex-row'>
      {sortedColors.map(color => (
        <div
          key={uuidv4()}
          className='min-h-0 w-full py-14 px-8 items-end hover:basis-full hover:cursor-pointer first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br'
          style={{ backgroundColor: `${color}` }}
        >
          {/* <p className='text-xs mix-blend-normal hover:mix-blend-overlay'>{color}</p> */}
        </div>
      ))}
    </div>
  )

  return (
    <article className='mb-20 mr-8 last:m-0 p-4 max-w-lg self-start break-inside-avoid border-solid border border-slate-200 shadow-2xl rounded'>
      <figcaption className='mb-8 font-header'>
        <span className='font-semibold'>{artwork.title}</span> <br />
        {artwork.artist_display}
      </figcaption>
      <figure className='mb-8'>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`}
          alt={artwork.title}
        />
      </figure>
      {colors && renderColours()}
    </article>
  )
}