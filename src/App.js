import React, { useEffect, useState } from 'react'
import momaService from './services/momaService.js'

export default function App() {
  const [queryData, setQueryData] = useState(null)
  const [objectData, setObjectData] = useState(null)
  
  useEffect(() => {
    async function getObjects() {
      const objects = await momaService.getDepartmentCollection('21')
      setQueryData(hasImages)
    }
    getObjects()
  }, [])

  useEffect(() => {
    async function getObject() {
      const randomNum = Math.round(Math.random() * queryData.length)
      const objectId = queryData[randomNum]
      const object = await momaService.getObject(objectId)

      setObjectData(object)
    }
    getObject()
  }, [queryData])
  
  const renderObject = () => (
    <div>
      <h1>{objectData.title}</h1>
      <img src={objectData.primaryImageSmall} />
    </div>
  )
  return (
    <div>
      {objectData && renderObject()}
    </div>
  )
}
