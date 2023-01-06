import { Flex, Image, Text } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../App'
import { firebaseapp } from '../firebaseConfig'
import { userInfo, userUploadedVideos } from '../utilities/fetchData'
import Recommend from './Recommend'
import Spinner from './Spinner'

const UserProfile = () => {
  const {userId} = useParams()
	const {data, setData} = useContext(store)

  const firestoreDb = getFirestore(firebaseapp)
  const [profile,setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userVideos,setUserVideos] = useState(null)
  const randomImage = 'https://source.unsplash.com/random/1600x900/?nature,photography,technology'
  useEffect(() => {
    if(userId){
      userInfo(firestoreDb,userId)
      .then((data)=>{
        setProfile(data)
        setLoading(false)
      })
      
      // userUploadedVideos(firestoreDb,userId)
      // .then((data)=>{
      //   console.log('start')
      //   setUserVideos(data)
      // })
    }
    
    if(data){
      setUserVideos(data.filter((item)=>item.userId==userId))
      console.log(data)
    }
  }, [userId])
  if(loading) return <Spinner msg={'Loading profile'}/>
console.log(userVideos)
  return (
    <>
     <Flex
      alignItems={'center'}
      justifyContent={'center'}
      width={'full'}
      height={'full'}
      p={2}
      direction='column'
     >
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            width={'full'}
            height={'full'}
            p={2}
            direction='column'
      >
           <Image 
              height={'320px'}
              width={'full'}
              objectFit={'cover'}
              borderRadius={'md'}
              src={randomImage}
            />
            {
              profile && (<>
                <Image src={profile?.photoURL}
              rounded='full'
              width={'70px'}
              height={'70px'}
              border='2px'
              mt={-10}
              minHeight={'70px'}
              minWidth={'70px'}
          />
              </>)
            }
             
      </Flex>
      {
        userVideos && (<>
        <Flex
            direction={'column'}
            width={'full'}
            my={6}
        
        >
            <Text
                my={4}
                fontSize={25}
                fontWeight='semibold'
            >
                Your Videos
            </Text>
        <Recommend recommended={userVideos}/>
        </Flex>
        </>)


            
       }
     </Flex>
    </>
  )
}

export default UserProfile