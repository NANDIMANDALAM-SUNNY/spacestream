import { Box, Button, Flex, Grid, GridItem, Image, Popover,PopoverCloseButton, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, useColorMode, useColorModeValue, PopoverFooter, ButtonGroup } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { IoHomeOutline, IoTrashBin } from 'react-icons/io5'
import { FcApproval } from 'react-icons/fc'
// FcApproval
import ReactPlayer from 'react-player'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { firebaseapp } from '../firebaseConfig'
import { deleteVideo, getRecommendedFeed, userInfo, videoInfo } from '../utilities/fetchData'
import Spinner from './Spinner'
import moment from 'moment'
import { fetUser } from '../utilities/fetchuser'
import { store } from '../App'
import Recommend from './Recommend'


const VideoPinDetail = () => {
   const {videoId} =  useParams()
	const {data, setData} = useContext(store)
   const { colorMode, toggleColorMode } = useColorMode()
  const textColor = useColorModeValue('gray.100','gray.100')
    const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
   const bg = useColorModeValue('gray.600','gray.300')
   const firestoreDb = getFirestore(firebaseapp)
   const [localUser] = fetUser()
   const [loading, setLoading] = useState(true)
   const [videoInformation, setVideoInformation] = useState(null)
    const [recommended, setRecommended] = useState(null)

const deleteVideoInformation = (videoId)=>{
    setLoading(true)
    deleteVideo(firestoreDb,videoId)
    navigate('/')
}


    useEffect(()=>{
        if(videoId){
            videoInfo(firestoreDb,videoId)
            .then((data)=>{
                setVideoInformation(data)

         

                userInfo(firestoreDb,data.userId)
                .then((data)=>{
                    setProfile(data)
                })

                setLoading(false)
            })
        }
        if(data){
            setRecommended(data.filter((item)=>item.id!==videoId))
        }
    },[videoId])
    if(loading) return <Spinner msg="Loadind the Video Info" />

  return (
    <>

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
                        <video src={videoInformation?.videoUrl} 
                            width={'100%'}
                            height={'100%'}
                            controls
                            muted
                        />
                    )  
                }
                </Flex>
                {
                    videoInformation?.description && (
                        <>
                          <Flex
                            my={6}
                            direction={'column'}
                          >
                                <Text my={2} fontSize={25} fontWeight='semibold'>Description</Text>
                                {videoInformation?.description}
                          </Flex>  
                        </>
                    )
                }

            </GridItem>
            <GridItem width={'100%'}  colSpan={1} p={2}>
                {
                    profile && (<>
                        <Flex direction={'column'} width={'full'} >
                            <Flex
                                alignItems={'center'}
                                width={'full'}
                            >
                                <Image 
                                    src={profile?.photoURL}
                                     rounded='full'
                                     width={'60px'}
                                     height={'60px'}
                                     borderColor={bg}
                                     minHeight={'60px'}
                                     minWidth={'60px'}
                                 />
                                 <Flex direction={'column'} ml={3} >
                                    <Flex alignItems={'center'} >
                                        <Text
                                        isTruncated
                                        fontWeight='semibold'
                                        >
                                            {profile?.displayName}
                                        </Text>
                                        <FcApproval />
                                    </Flex>
                                    {
                                        videoInformation?.id && (<>
                                            <Text fontSize={12}>{moment(new Date(parseInt(videoInformation?.id)).toISOString()).fromNow()}</Text>
                                        </>) 
                                    }
                                 </Flex>
                            </Flex>
                            {/* action buttons */}
                            <Flex justifyContent={'space-around'} mt={6} >   
                            {
                                profile?.uid === localUser?.uid && (<>
                                    <Popover closeOnEsc >
                                        <PopoverTrigger>
                                            <Button colorScheme={'red'} ><IoTrashBin fontSize={20} /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Confirmation</PopoverHeader>
                                            <PopoverBody>Do you want to delete🙀!</PopoverBody>
                                            <PopoverFooter display='flex' justifyContent='flex-end'>
                                                <ButtonGroup size='sm'>
                                                {
                                                    videoId && (<>
                                                        <Button colorScheme='red' onClick={()=>deleteVideoInformation(videoId)} >Yes</Button>
                                                    </>)
                                                }
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                        </Popover>
                                </>)
                            }

                                <a href={videoInformation.videoUrl}  download onClick={(e)=>e.stopPropagation}>
                                Download
                                {/* <Button colorScheme={'green'} >Download</Button> */}
                                </a>
                            </Flex>
                        </Flex>
                    </>)
                }
            </GridItem>
        </Grid>
       {
        recommended && (<>
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
                Recommend Videos
            </Text>
        <Recommend recommended={recommended}/>
        </Flex>
        </>)


            
       }
    </Flex>
    </>

  )
}

export default VideoPinDetail