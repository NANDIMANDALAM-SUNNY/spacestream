import { Box, SimpleGrid } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../App'
import { firebaseapp } from '../firebaseConfig'
import { getAllFeeds } from '../utilities/fetchData'
import NotFound from './NotFound'
import Spinner from './Spinner'
import VideoPin from './VideoPin'

const Main = () => {
	const {data, setData} = useContext(store)
  const [filteredData,setFilteredData] = useState(null) 
  const {categoryId} = useParams()
    const firestoreDb = getFirestore(firebaseapp)

  const filteredItems = (categItem)=>{
    const updatedItems = data.filter((currItem)=>{
      return currItem.category === categoryId
    })
    setFilteredData(updatedItems)
  }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
      if(  categoryId){
        filteredItems(categoryId)
        setLoading(false)
      }
      else{
      getAllFeeds(firestoreDb)
      .then((data)=>{setData(data)
      setFilteredData(data)
      setLoading(false)})
      }
    }, [categoryId])
    if(loading) return  <Spinner msg={"Loading the Videos"} />
  return (
    <>
      <SimpleGrid 
        minChildWidth='300px' 
        spacing='15px' 
        width={'full'}
        autoColumns={'max-content'}
        px='2'
        overflowX={'hidden'}
       >
          {
            filteredData !== null && filteredData?.map((item)=>(
              <VideoPin 
                key={item.id} 
                maxWidth={420} 
                height='80px'
                data={item}
                 />
            ))
          }
          
      </SimpleGrid>
    </>
  )
}

export default Main