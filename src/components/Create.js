import { Button, Flex, Input, InputGroup, Box, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue, FormLabel } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloudUpload, AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai'
import { IoLocation } from 'react-icons/io5'
import {MdOutlineArrowDropDownCircle} from 'react-icons/md'
import {categories} from '../data'
import Spinner from './Spinner'
import {getStorage ,ref, uploadBytesResumable,getDownloadURL,deleteObject } from 'firebase/storage'
import {firebaseapp} from '../firebaseConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Textarea } from '@chakra-ui/react'
import { fetUser } from '../utilities/fetchuser'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const Create = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('gray.50','gray.900')
  const textColor = useColorModeValue('gray.900','gray.50')
  const [category,setCategory] = useState('Choose a category')
  const [title,setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [videoAset,setVideoAset] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(1)
  const [userInfo] = fetUser()
  const [description, setDescription] = useState('')
  const uploadedSuccessFully = () => toast.success("Uploaded successfully 🥳",{theme:'colored'});
  const uploadFailed = () => toast.error("Uploaded Failed 😭",{theme:'colored'});
  const deletedVideo = () => toast.warning("Successfully Deleted 😔",{theme:'colored'});
  const uploadDetailsFunc = () => toast.success("Successfully Posted 🎉",{theme:'colored'});
  const uploadDetailsFailedFunc = () => toast.error("Please Enter all fields ⚠️",{theme:'colored'});
  const firebaseDb = getFirestore(firebaseapp)
  const storage = getStorage(firebaseapp)
  const uploadVideo = (e)=>{
    setLoading(true)
    const videoFile = e.target.files[0] 
    const storageReference = ref(storage,`Videos/${Date.now()}-${videoFile.name}`)
    const uploadTask = uploadBytesResumable(storageReference, videoFile);
    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes*100)
      setProgress(uploadProgress)
    },
      (error)=>{
        uploadFailed()
        console.error(error)
      },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        uploadedSuccessFully()
        setVideoAset(downloadURL)
        setLoading(false)

      })
    },

  )}


  const deleteVideo  = ()=>{
    const deleteRef = ref(storage,videoAset)
    deleteObject(deleteRef)
      .then(()=>{
          setVideoAset(null)
          deletedVideo()
      }).catch((error)=>{
        console.error(error)
      }) 
    }


    const uploadDetails = async ( ) =>{
        try {
          console.log("hello")
          setLoading(true)
          if(!title && !description && !videoAset && !category){
            uploadDetailsFailedFunc()
          }
          else{
            const data = {
              id : `${Date.now()}`,
              title:title,
              userId: userInfo?.uid,
              category:category,
              location:location,
              videoUrl:videoAset,
              description:description
            }
           console.log(data)

            await setDoc(doc(firebaseDb,'videos',`${Date.now()}`),data)
            setLoading(false)
            uploadDetailsFunc()
            navigate('/')
          }
        } catch (error) {
          uploadDetailsFunc()
          console.log(error)
        }
    }


  useEffect(() => {
   
  }, [title,location,description,category, videoAset])
  return (
    <>
      <Flex
        justifyContent={'center'}
        alignItems='center'
        width={'full'}
        minHeight='100vh'
        padding={10}
      >
          <Flex
            width={'80%'}
            height={'full'}
            border={'1px'}
            borderColor='gray.300'
            borderRadius={'md'}
            padding={4}
            flexDirection={'column'}
            alignItems='center'
            justifyContent={'center'}
            gap={2}
          >
            {/*File Location  */}
              <Flex
                border={'1px'}
                borderColor='gray.500'
                height='400px'
                width={'full'}
                borderRadius={'md'}
                overflow='hidden'
                position='relative'
              >
                {
                  !videoAset ? (
                    <FormLabel  width={'full'}>
                      <Flex
                        direction={'column'}
                        alignItems='center'
                        justifyContent={'center'}
                        height='full'
                        width={'full'}
                      >
                          <Flex
                              direction={'column'}
                              alignItems='center'
                              justifyContent={'center'}
                              height='full'
                              width={'full'}
                              cursor='pointer'
                          >
                            {
                              loading ? (
                                <>
                                  <Spinner progress={progress}/>
                                </>
                                ):(
                                  <>
                                    <AiOutlineCloudUpload fontSize={40} />
                                    <Text ml={4} fontSize={18} >Click to Upload</Text>
                                  </>
                              )
                            }
                          </Flex>
                      </Flex>
                      {
                          !loading && (<>
                            <input
                              type={'file'}
                              name='upload'
                              onChange={uploadVideo}
                              style={{width:0,height:0}}
                              accept="video/mp4,video/x-m4v,video*"
                            />
                          </>)
                      }
                    </FormLabel>
                  ):(
                    <Flex
                        alignItems='center'
                        justifyContent={'center'}
                        height='full'
                        width={'full'}
                        bg='black'
                        position='relative'
                    >
                      <Flex
                        alignItems='center'
                        justifyContent={'center'}
                        height='40px'
                        width={'40px'}
                        top={5}
                        right={5}
                        position={'absolute'}
                        cursor={'pointer'}
                        zIndex={10}
                        onClick={deleteVideo}
                      > 
                        <AiTwotoneDelete fontSize={20} color='red' />
                      </Flex>
                      <video 
                        src={videoAset}
                        controls
                        style={{width: '100%', height: '100%'}}
                      />
                    </Flex>
                    )
                }
              </Flex>
              <Input 
                variant={'flushed'}
                placeholder='Enter the Title'
                focusBorderColor='gray.600'
                isRequired
                errorBorderColor='red'
                type={'text'}
                _placeholder={{color:'gray.500'}}
                fontSize={20}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
              />
            
            <Flex
              justifyContent={'space-between'}
              width='full'
              alignItems={'center'}
              gap={8}
              my={4}
            >
                <Menu>
                    <MenuButton width={'full'}  as={Button } rightIcon={<MdOutlineArrowDropDownCircle fontSize={25} />}>
                      {category}
                    </MenuButton>
                    <MenuList 
                      zIndex={101}
                      width={'md'}
                      shadow={'xl'}
                    >
                    {
                      categories && categories?.map((item)=>(
                        <MenuItem 
                          _hover={{bg:'blackAlpha.300'}}
                          fontSize={20}
                          px={4}
                          onClick={()=>setCategory(item.name)}
                          key={item.id}
                        >
                          {item.iconSrc}<Text ml={4} fontSize={18} >{item.name}</Text>
                        </MenuItem>
                      ))
                    }
                      
                    </MenuList>
              </Menu>
              <InputGroup>
                <InputLeftElement 
                  pointerEvents='none'
                  children={<IoLocation fontSize={20}  />}
                  />
                <Input type='text' placeholder='Location' 
                  variant={'flushed'}
                    focusBorderColor='gray.600'
                    isRequired
                    errorBorderColor='red'
                    _placeholder={{color:'gray.500'}}
                    fontSize={20}
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
              </InputGroup>
            </Flex>

          
              <Textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='Description'
                size='sm'
              />
              <Button 
                isLoading={loading} 
                loadingText="Uploading " 
                variant={`${loading?'outline':'solid'}`} 
                // width={'sm'}
                _hover={{shadow : 'lg'}}
                fontSize={20}
                onClick={uploadDetails}
                >
                Upload</Button>
          </Flex>
      </Flex>
    <ToastContainer />
     
    </>
  )
}

export default Create