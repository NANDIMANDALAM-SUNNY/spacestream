import { Box, SimpleGrid } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { firebaseapp } from '../firebaseConfig'
import { getAllFeeds } from '../utilities/fetchData'
import Spinner from './Spinner'
import VideoPin from './VideoPin'

const Main = () => {

    // datavase instance
    const firestoreDb = getFirestore(firebaseapp)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      getAllFeeds(firestoreDb)
      .then((data)=>setData(data))
      setLoading(false)
    }, [])
    if(loading) return  <Spinner msg={"Loadind the Videos"} />


  return (
    <>
      <SimpleGrid 
        minChildWidth='300px' 
        spacing='15px' 
        width={'full'}
        autoColumns={'max-content'}
        px='2'
        overflow={'hidden'}
       >
          {
            data && data?.map((item)=>(
              <VideoPin 
                key={item.id} 
                maxWidth={420} 
                height='30px'
                data={item}
                 />
            ))
          }
      </SimpleGrid>
    </>
  )
}

export default Main