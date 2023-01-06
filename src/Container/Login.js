import { Button, Flex, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth' 
import { firebaseapp } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { doc, getFirestore, setDoc } from 'firebase/firestore'


const Login = () => {
    const firebaseAuth = getAuth(firebaseapp);
    const provider = new GoogleAuthProvider;
    const firebaseDb = getFirestore(firebaseapp)
    const navigate = useNavigate()
    const handleLogin =async () =>{
       const {user} = await signInWithPopup(firebaseAuth,provider)
       const {refreshToken,providerData}=user;
       localStorage.setItem('user',JSON.stringify(providerData))
       localStorage.setItem('accessToken',JSON.stringify(refreshToken))
       await setDoc(doc(firebaseDb,'users',providerData[0].uid),providerData[0])
       navigate('/')

    }
  return (
   <>
    <Flex 
        justifyContent={'center'}
        alignItems={'center'}
        width={'100vw'}
        height={'100vh'}
        position={'relative'}
    >
        <Image 
            objectFit='cover' 
            width={'full'} 
            height={'full'} 
            src='https://img.freepik.com/free-photo/futuristic-abstract-background-with-circular-shapes_24972-1913.jpg?w=996&t=st=1673017177~exp=1673017777~hmac=2e068422c8a456342136fa173a681a6a84294d14e5b358a10a3b67ff742eebff'
            />
        <Flex 
            position={'absolute'}
            width={'100vw'}
            height={'100vh'}
            bg={'blackAlpha.600'}
            top={0}
            left={0}
            justifyContent='center'
            alignItems='center'
        >
            <HStack>
                <Button 
                    leftIcon={<FcGoogle />}
                    colorScheme='whiteAlpha'
                    shadow={'lg'}
                    onClick={handleLogin}
                     >
                    Sign in with Google
                </Button>
            </HStack>
        </Flex>    
    </Flex>
   </>
  )
}

export default Login