
import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({children}) => {
 
    const token = Cookies.get('userToken')
    return token ? children : <Navigate to='/'/>
}

export default PrivetRoute