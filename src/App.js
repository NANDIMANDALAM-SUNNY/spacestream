import React, { useEffect, useState } from 'react'
import { Routes ,Route, useNavigate } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Container/Login'
import { fetUser, userAccessToken } from './utilities/fetchuser'

const App = () => {
const [user,setUser] = useState(null)
const navigate = useNavigate()


useEffect(()=>{
  const accessToken = userAccessToken();
  if(!accessToken) return navigate('/login')
  else{
    const [userInfo] = fetUser()
    setUser(userInfo)
  }
},[])


  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login />}/>
        <Route  path='/*' element={ <Home  user={user} /> }/>
      </Routes>
    </>

  )
}

export default App