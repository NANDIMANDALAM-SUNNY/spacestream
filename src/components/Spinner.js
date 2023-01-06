import { Flex, Progress, Text } from '@chakra-ui/react'
import React,{useEffect} from 'react'
import { Circles } from 'react-loader-spinner'


const Spinner = ({msg,progress}) => {

    useEffect(()=>{

    },[progress])


  return (
    <>
        <Flex
            direction={'column'}
            alignItems='center'
            justifyContent={'center'}
            height='full'
            width={'full'}
            px={10}
        >
            <Circles 
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true} 
            />
            <Text
                fontSize={25}
                textAlign='center'
                px={2}
            >Uploading your vide
            </Text>
            {
                progress && (
                    <Progress 
                        mt={50}
                        hasStripe
                        isAnimated
                        size='sm' 
                        value={Number.parseInt(progress)}
                        width={'sm'}
                        rounded='sm'
                        colorScheme={'linkedin'} 

                        />
                )
            }
        </Flex> 
    </>
  )
}

export default Spinner