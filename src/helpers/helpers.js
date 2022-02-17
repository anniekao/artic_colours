export const filterArtwork = (artworks) => {
  return artworks.filter(artwork => artwork.image_id && artwork.colorfulness > 20)
}

export const copyHexToClipboard = (hex) => {
  navigator.clipboard.writeText(hex)
}