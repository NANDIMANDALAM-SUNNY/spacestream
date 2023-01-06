import { Button, Flex, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {IoMoon, IoSearch, IoSunny} from 'react-icons/io5'
import {BsFillMoonStarsFill} from 'react-icons/bs'
import {FaSun} from 'react-icons/fa'
import {AiOutlineVideoCameraAdd, AiOutlineLogout} from 'react-icons/ai'

const Navbar = ({user}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('gray.600','gray.300')
  const logo_dark = "data:image/png;base64,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"
  const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAEuCAMAAADcAPJ6AAAAmVBMVEX///8mK0AjKD4AACkjKT4WHTYdIzoADi4aIDgcIjkTGjQhJjwgJTwMFTEADy4GES/5+fr09PXq6uzg4OPKy8+/wMU8QFK0tbtbXmxOUWAABirOz9MKEzCLjZbY2dzt7u93eYSUlp6cnqWvsLYAACRqbXkvNEgsMUZlaHSmp65FSFmChI5UV2ZzdoFeYG6hoqoAABo/Q1QAABWQ82jvAAAJ8ElEQVR4nNWda3uiOhSFYwRBLgLe2qJVe7OtttPp+f8/7ojazlgJ7ODaJPOe74f9MK5mJ3tlIUS7pGmaZcvhjtFotFjMxuPJ5Orh4fX14/7+7na7Xb2//Lp+u9lM1503phJ2j/9+cvHoj+LBq+LRT/tn32w+P6fr9XPHiXw3iBMv9waDZD6P42CHu8P3/V4vDEMpHdnxrnjKvP3dzXPP83aPjgv2z/b39Hu9KCz+2z1fOo50OvWEm5SlzMwjPFyD4J6lTHEXYOvsDlnKTDuUf0w67oqlTPERQ8t0woynTimhdQ4eeMq8wr7O8IanTDENoXV2FzxlTrB/lLhEJDbQ18kmovEAWSbbiineImSZEZeIFl1kmZ3uiKnOpz6yzGDLVOYoR5YpHSYRiXcfWWfOJaIhtFHqcXXxYusi62QTUfaILJNNRNj+WD5ziSglbXaosIkI2x/ziSh9RvbHCZeIxMMcWGZwy1WmWAN/nc6aZ8e+Y4Js6PhEJG6ADR2fiMQY2YHEbCKC9seMIpoBf52MIhIvwP44n7CVOQJuN/p8IoL2x4wiQvbH8R1bmcj+WDKKaAk8qunyiQjZH/d/8ZWZuriGjlFE4h73OjlFlK5hr5NTRMj+mHElEqIDe53+C2OZkwRVpuPyzIkO4M6PY6ax2x5cfxxOGcsE9sfemLHMGWzJZBWR+NUDlSl9ThHh+mNWEeH644hVREPYr5NVRLj+2H/iLHPpgo6UpL/krBPWH8cfnGWmqF9ntOYsE9cfezPOMmHnx/47Z5mw/li6rCKCnR/PX1nLvAK9Tt52TohPUH/MKyIxAfXHbD6VI6D+2OFdicQM9DoTXhGh+uPwk7fMBWgzPOAVkXjHHMdzi2iI2W44Pa4R+5EtZrvBLSLQcXy44S1T3GK2GwmTY/KLNIA0dNwiAvXH7CIC2VUSJtvxN5j+mF1EAnMczy0icQVZMl02s9cXEDu34zIONvZg7CoJn0/lCKQ/7nHZjr+ZQToQj1tE4hrRHzP6VI5A+mPH5xaReEI0dAN2EQ0RhllGs9cXkP7YYxyxHxgifp38IoL0xy2IKOsDOhC2CzB/QBzH96/ZyxSI7Qaf7fibV4CduwURIfpjGfKXieiPB5w+lSOA/pjT7PUFwq6ScI7YjwDs3AGj2esLQH8sJX+ZiPNjrwURLS4fufL6VI4A7NyetojSbLk8RGEsZrNDIsVH9b/J6HKxu/dFDkeaZbuHL4swjn0exnccxv3d7e12VYRh3Gw+p+tnGUZ933fdIIjjeZIkh0iKJKqe4gD6Y2czXU+LKA7Zc4O5lxd5GIckjn0UR5HF4feLMIxon8VRhGGc/0/y6n3qErEZlsenX3DaV3eLBnR+fClxzZlUFmHzKxri17Wu6DiQZoR19ySRdu7myFonOKI/vpxu7b4Ket2xKfPajQDm/PhCajWEzq9oRq2G4HEgjajXkB2vk3CHBuc/bk69hkDnx5fhEhrXBTS/ohHhlDAHhZwfX4RDSWkYIa+KN4O0q1oZf50JZS+9hOZXNIGiIQv645BkCM5MN3SOSzotNd4f0+5youPytEloVz5M98c0DQnhm32dvU/aAAcaB6KPExDPeT6hgWTaUO9DG+6PB9RrU2b7Y5d6RWFsdPdGv931ZrI/ln3qWSk4Lk8T+iU0bFyeJjn51tTIpNgD+jUfk/1xjx6WDPFXNISuIbP9cZfu/M8MruwDjZuHBvtjDQ2JzFx/rOVjNNcfy1jnMpK56Uaic3vGXH+ca133AMdJ0wlWOmUa64/7eoZ6ZFyeDs6z1oW+sanX+ah3A83U6/T0bnuYOj/W05Cx/tjX9NMj4/I0kFLzKpJGHEjhTQijqLd3cbhucEkrqHt35ng/r/hSiQyLInZV9Isy9m6SeZJ4npfn3e7jY3fud9bTzdv1y9Nqu729u7u/b75B7eremNr+znMvdqNdCdPNzdv1r5en930ZH68PV5PJeDxbLEbDZVa2MZg07l7q7BTnFEXsyLI01TY73zRdbnU1dBmNHU5hh/k63ylNt1ROzH515oRew6a13k4BpamLVV9Dl9FwrEywU0BpqCKCnQLLXTMVsQX2qwgbqYj/vtQPmqmIYqfA8tJERX4LZvpTGqU1hM/s95B+0uQ+PMWShGbaYPzNGeuroMkWNW5dQ408627L61DBUn+LGk1b11ATFUn+G5wl6KuINdVXhX4QE8mSBEfb2Ua1U2BZ6rozIs7IaTW6h/lESxIc3cuSBtahAl0VDYxoSHtga0ZDhQNPS0VG1qECPRXx5oxXoWfKyVkzfSvQS+kwpSFNFQWs0cNVpDp/lCLmhMIKdD6s6+hf34ShM2samNKQ3qyJbOtjQCPc2zWmoZ2K6H6CnjkN6ahIRuY0JMQbeS16NKchnRFjwhqGXgd5wGFuHSogh5D32PMJK6HG2MmANx+5DuqAg/f7DLVQBxx6liQ8RKugrp0CDu3bTEbXoQKaGcupSafghzbgYE6Wr2dIWtrp9nIuSCoyriFawkC/VTtFKZQ7Kk7PtIZoprHctIZoA46B4XWo4KNeRfHKdJGCYgy2QEOUJAQpzWuIMuDgT/MlkNW+Tm1bHwuvdSoKWrYkKag7muX8mrMGdQMO2bYlSUHd0eyjDRraqahX3YK0kD5L4qG682zb1qekei2yREN112RDx9AY64zKXMC2rbFq0koVtWyNraBSRSYsSQqqBhxtW2MrqBoTtm6NraBiwCHnZuwUpVS8zrrEyzap+KBhYo+Gqo5mW4nIpaLOGAjNWJIUKAccsoVMeQ2UR7Nt5DfTUXrPrdKQWkVu6/bySlTec2OWJAWKGxwm7OVVpIqP6z5apSHlmHBuzJKkoDx+3pStT8mwdGkPLdOQwnvuzE3aKUopdc0asZdXUnqDw6QlSUHZgMOkJUnBsuTXSU8aa4+SAYf0rdNQqYq6Zu0UpczO1yILNVT27WezliQF2VmDTE28bJcz77lpS5KCswGHYUuSgrMv4Hg2auh8wKGTNNYi6Y/XadySpODH0aykpsa2zY+jWeOWJAU/vOembX1KTgccVq5DBdnJx4qssFOUcuI9N2svr+RkLdJMGmuRE++5Z6uGTo9mLbD1qUj/UpFmWl+r/PVFIRnaM8Y6469PqA+s1dBORX/+KNlhSVLwR0WWWJIUfH8Vo92kMV2+BxyyY+V+6Itv73nNxw8NM/xq5K3t5Q58ec+tsSQpOHrPfVssSQqO3nPZt3gdKjioyNFNvGyb4xdMbbH1KTkMOGzX0DFcx3YNHQcc0dpyDR0HHFbYyytZFh2dPbY+JYX33H4N7V2zFtn6lMzyTmi/hoqjWcdI0pgmS9+xydan5DW2zk5RyjT4BzRUeM+tsvUpWeX/gIaESP+zzk5Ryus/sA4V/CNlDq0+UzjwP9GWx6070PtjAAAAAElFTkSuQmCC"
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
              src={colorMode== 'light'?logo_dark:logo}
              width={'20px'}
              height={'20px'}
                />
        </Link>
        <InputGroup mx={6} width='60vw' >
          <Input 
             fontSize={18}
             variant={'filled'}
             fontWeight={'medium'}
             type='text' placeholder='Search' />
            <IoSearch  
              fontSize={25}/>
        </InputGroup>

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
                  <Link to='/profile'>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem 
                    flexDirection={'row'}
                    alignItems='center'
                    gap={4}
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
