import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <>
        <Flex
            width={'full'}
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
        >
            <Image 
                src=""
                width={600}
            />
            <Text
                fontSize={40}
                fontWeight='semibold'
            >
                Data Not Found
            </Text>
        </Flex>
    </>

  )
}

export default NotFound