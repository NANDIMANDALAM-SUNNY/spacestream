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
            src='data:image/jpeg;base64,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'  
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