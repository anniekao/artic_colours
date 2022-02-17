import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import hexSorter from 'hexsorter'
import { usePalette } from 'react-palette'
// import { IoIosCheckmarkCircle } from 'react-icons/io'
import { copyHexToClipboard } from '../helpers/helpers'

export default function Card({ artwork }) {
  const imgUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`
  const { data } = usePalette(imgUrl)
  const colors = Object.keys(data).map(k => (data[k]))
  const sortedColors = colors && hexSorter.sortColors(colors, 'mostBrightColor')
  const [copySuccess, setCopySuccess] = useState('')

  const handleCopy = (hexValue) => {
    copyHexToClipboard(hexValue)
    setCopySuccess(`${hexValue} copied to clipboard!`)
  }

  console.log(copySuccess)
  const renderColours =() => (
    <div className='flex flex-row'>
      {sortedColors.map(hexValue => (
        <div
          key={uuidv4()}
          className='flex items-center justify-center min-h-0 w-1/4 py-14 px-2 group hover:cursor-pointer hover:w-1/2 transition-all first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br'
          style={{ backgroundColor: `${hexValue}` }}
          onClick={() => handleCopy(hexValue)}
        >
          <span className='absolute opacity-0 group-hover:opacity-100 text-s mix-blend-hard-light'>{hexValue}</span>
        </div>
      ))}
    </div>
  )

  return (
    <article className='mb-20 last:m-0 p-4 max-w-sm md:max-w-lg self-start break-inside-avoid border-solid border border-slate-200 shadow-2xl rounded'>
      <figcaption className='mb-8 font-header'>
        <span className='font-semibold text-lg'>{artwork.title}</span> <br />
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