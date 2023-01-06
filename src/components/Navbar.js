import { Button, Flex, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {IoMoon, IoSearch, IoSunny} from 'react-icons/io5'
import logo from '../images/logo.png'
import {BsFillMoonStarsFill} from 'react-icons/bs'
import {FaSun} from 'react-icons/fa'
import {AiOutlineVideoCameraAdd, AiOutlineLogout} from 'react-icons/ai'

const Navbar = ({user}) => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('gray.600','gray.300')
  
  return (
    <>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100vw'}
        p={4}
      >
        <Link to='/'>
            <Image 
              src={logo}
              width={'40px'}
              height={'40px'}
                />
                <Text >Space Stream</Text>
        </Link>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
        >
         {/* create button */}
         <Link to='/create'>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            bg={bg}
            width='40px'
            height='40px'
            mx={6}
            cursor='pointer'
            borderRadius='8px'
            transition='ease-in-out'
            transitionDuration={'0.5s'}

          >
            <AiOutlineVideoCameraAdd 
              fontSize={25}
              color={`${colorMode=='dark'?'#111':'#f1f1f1'}`}  
              />
          </Flex>
         </Link>
          <Flex
            width={'40px'}
            height={'40px'}
            justifyContent={'center'}
            alignItems={'center'}
            cursor='pointer'
            borderRadius='5px'
            onClick={toggleColorMode}
          >
            { colorMode=='light'?<BsFillMoonStarsFill fontSize={25}/>:<FaSun fontSize={25}/> }
          </Flex>
            <Menu>
                <MenuButton >
                {
                  user?.photoURL !== null && <Image src={user?.photoURL} 
                    width='40px'
                    height='40px'
                    rounded='full'   
                    />
                  }
                </MenuButton>
                <MenuList>
                  <Link to={`/user/${user?.uid} `}>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem 
                    flexDirection={'row'}
                    alignItems='center'
                    gap={4}
                    onClick={()=>{
                      localStorage.clear();
                      navigate('/login')
                    }}
                     >Logout <AiOutlineLogout fontSize={20} />
                    </MenuItem>
                </MenuList>
              </Menu>
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar
