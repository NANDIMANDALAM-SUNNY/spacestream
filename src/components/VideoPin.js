import { Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebaseapp } from '../firebaseConfig'
import { userInfo } from '../utilities/fetchData'

const VideoPin = ({data}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('blackAlpha.600','gray.900')
  const textColor = useColorModeValue('gray.100','gray.100')
  const [profile, setProfile] = useState(null)
  const firestoreDb = getFirestore(firebaseapp)
  const [userId, setUserId] = useState(null)
useEffect(() => {
  if(data) setUserId(data.userId)
  if(userId) userInfo(firestoreDb,userId).then((data)=>{
    setProfile(data)
  })
  
  
}, [userId])

  return (
   <>
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      cursor={'pointer'}
      rounded='md'
      overflow={'hidden'}
      maxWidth={'300px'}
      // position={'realtive'}
      height={'180px'}
    >
      <Link  to={`/videoDetail/${data?.id}`}>
        <video 
          src={data.videoUrl}
          muted
          onMouseOver={(e)=>e.target.play()}
          onMouseOut={(e)=>e.target.pause()}
        />
      </Link>
      <Flex
        position={'absolute'}
        bottom='100'
        left='100'
        p={2}
        bg={bg}
        width={'full'}
        direction={'column'}
      >
        <Flex
        width={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
          <Text color={textColor} fontSize={20} isTruncated >{data?.title}</Text>
          <Link  to={`/user/${userId}`} >
            <Image src={profile?.photoURL}
              rounded='full'
              width={'50px'}
              height={'50px'}
              border='2px'
              borderColor={bg}
              mt={-10}
          />
          </Link>
    
        </Flex>
        <Text
          fontSize={12}
          color={textColor}
          ml='auto'
        >
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>

      </Flex>
    </Flex>
   </>
  )
}

export default VideoPin