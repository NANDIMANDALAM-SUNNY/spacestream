import React, { createContext, useEffect, useState } from 'react'
import { Routes ,Route, useNavigate, useParams } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Container/Login'
import { fetUser, userAccessToken } from './utilities/fetchuser'


export const store = createContext();



const App = () => {
const [user,setUser] = useState(null)
const [data, setData] = useState(null)


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
    <store.Provider 
      value = {{data, setData}}
    
    >
      <Routes>
        <Route exact path='/login' element={<Login />}/>
        <Route  path='/*' element={ <Home  user={user} /> }/>
      </Routes>
    </store.Provider>

    </>

  )
}

export default App