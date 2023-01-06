import { Box, Flex, Grid, GridItem, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { firebaseapp } from '../firebaseConfig'
import { videoInfo } from '../utilities/fetchData'
import Spinner from './Spinner'


const VideoPinDetail = () => {
   const {videoId} =  useParams()
   const { colorMode, toggleColorMode } = useColorMode()
  const textColor = useColorModeValue('gray.100','gray.100')

   const bg = useColorModeValue('gray.600','gray.300')
   const firestoreDb = getFirestore(firebaseapp)
   const [loading, setLoading] = useState(true)
   const [videoInformation, setVideoInformation] = useState(null)
    useEffect(()=>{
        if(videoId){
            videoInfo(firestoreDb,videoId)
            .then((data)=>setVideoInformation(data))
            setLoading(false)
        }
    },[videoId])
    if(loading) return <Spinner msg="Loadind the Video Info" />

  return (
    <Flex
        width={'full'}
        height='auto'
        justifyContent={'center'}
        alignItems='center'
        direction={'column'}
        py={2}
        px={2}
    >
        <Flex
            alignItems={'center'}
            width={'full'}
            my={2}  
        >
            <Link to='/'>
                <IoHomeOutline fontSize={25}/>
            </Link>
            <Box width='1px' height='25px' bg={'gray.500'} mx={2}></Box>
            <Text
                isTruncated
                color={textColor}
                fontWeight='semibold'
                width={'100%'}
            >{videoInformation?.title}</Text>
        </Flex>
        <Grid templateColumns='repeat(3,1fr)' gap={2} width='100%'>
            <GridItem width={'100%'}  colSpan={2} p={2}>
                <Flex
                    width={'100%'}
                    bg='black'
                    position='relative'
                >
                {
                    videoInformation?.videoUrl && (
                        <ReactPlayer url={videoInformation?.videoUrl} 
                            width={'100%'}
                            height={'100%'}
                            // controls
                        />
                    )  
                }
                {/* Controls */}
                   {/* <Flex
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    zIndex={1}
                    cursor={'pointer'}
                   >
                    
                   </Flex> */}
                </Flex>
            </GridItem>
            <GridItem width={'100%'}  colSpan={1} p={2}></GridItem>
        </Grid>
    </Flex>
  )
}

export default VideoPinDetail