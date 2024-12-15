
import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const AdminPrivetRoute = ({children}) => {
 
    const token = Cookies.get('adminToken')
    return token ? children : <Navigate to='/'/>
}

export default AdminPrivetRoute