import React from 'react'
// import useImageColor from 'use-image-color'

export default function Card({ artwork }) {

  // const { colours } = useImageColor(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`, { cors: true, colors: 2 })

  console.log(artwork)
  // console.log(colours)
  // const renderColours =() => (
  //   <div>
  //     {colours.map(colour => (
  //       <div key={colour} style={{ backgroundColor: `${colour}`, height: '100px', width: '100px' }}>
  //         {colour}
  //       </div>
  //     ))}
  //   </div>
  // )

  return (
    <div>
      <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`} />
      {artwork.title} {artwork.artist_display}
      {/* {renderColours()} */}
    </div>
  )
}