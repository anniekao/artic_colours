import React, { useState } from 'react'
import { MdOutlineCheck } from 'react-icons/md'
import { copyHexToClipboard } from '../helpers/helpers'
import { toast } from 'react-toastify'

function ColourTile({ hexValue }){
  // eslint-disable-next-line no-unused-vars
  const [clicked, setIsClicked] = useState(false)
  const [iconClass, setIconClass] = useState('')
  const [hexTextClass, setHexTextClass] = useState('')

  const handleCopy = (hexValue) => {
    copyHexToClipboard(hexValue)
  }

  const handleClick = () => {
    const clicked = true
    setIsClicked(clicked)
    if(clicked) {
      setIconClass('absolute opacity-100')
      setHexTextClass('opacity-0')
      toast.dark(`${hexValue} copied to clipboard!`)
    }
  }

  const handleMouseLeave = () => {
    const clicked = false
    setIsClicked(clicked)
    if (!clicked) {
      setIconClass('')
      setHexTextClass('')
    }
  }

  return (
    <div
      className='flex items-center justify-center min-h-0 w-1/4 py-8 px-2 group hover:cursor-pointer hover:w-1/2 transition-all first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br'
      style={{ backgroundColor: `${hexValue}` }}
      onClick={(e) => {
        e.preventDefault()
        handleCopy(hexValue)
        handleClick()
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        handleMouseLeave()
      }}
    >
      <span className={iconClass ? iconClass : 'opacity-0'}>
        <MdOutlineCheck size={36} />
      </span>
      <span className={
        hexTextClass
          ? hexTextClass
          : 'absolute opacity-0 group-hover:opacity-100 text-md mix-blend-hard-light'}>
        {hexValue}
      </span>
    </div>
  )
}

export default ColourTile