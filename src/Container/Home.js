import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Category, Create, Main, Navbar, Search, UserProfile, VideoPin, VideoPinDetail } from '../components'
import {categories} from '../data'


const Home = ({user}) => {


  return (
    <>
     <Navbar user={user}/> 
     <Flex
      width={'100vw'}
     >
        <Flex
          direction={'column'}
          justifyContent='start'
          alignItems={'center'}
          width='5%'
        >
          {categories && categories?.map((item)=><Category data={item} key={item.id}/> )}
        </Flex>
        <Flex
          width={'95%'}
          px={4}
          justifyContent='center'
          alignContent={'center'}
      >
          <Routes >
            <Route path='/' element={<Main />} />
            <Route path='/category/:categoryId' element={<Main />} />
            <Route path='/create' element={<Create />} />
            <Route path='/videoDetail/:videoId' element={<VideoPinDetail />} />
            <Route path='/search' element={<Search />} />
            <Route path='/user/:userId' element={<UserProfile />} />
          </Routes>
        </Flex>
     </Flex>
    </>
  )
}

export default Home