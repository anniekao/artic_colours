import React from 'react'
import { IoChevronForwardOutline, IoChevronBack } from 'react-icons/io5'


export default function PageNav({ changePage }) {
  return (
    <nav className='flex flex-row justify-between'>
      <button type="button" onClick={() => changePage('prev')} className='text-slate-400'>
        <IoChevronBack size={70} />
      </button>
      <button type="button" onClick={() => changePage('next') } className='text-slate-400'>
        <IoChevronForwardOutline size={70} />
      </button>
    </nav>
  )
}