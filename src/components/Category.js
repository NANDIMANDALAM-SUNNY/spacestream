import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({data}) => {
  const { colorMode } = useColorMode()
  const bg = useColorModeValue('gray.600','gray.300')

  return (
    <>
      <Flex cursor={'pointer'} my='5'>
        <Link to={`/category/${data?.name}`}>
          {data?.iconSrc}{data?.name}
        </Link>
      </Flex>
    </>
  )
}

export default Category