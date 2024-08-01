import React from 'react'
import App from '../App'
import { createBrowserRouter } from 'react-router-dom'

const CustomRoutes = () => {

  return createBrowserRouter([
    {
      path:'/',
      element:<App/>, 
    },
    
  ])
}

export default CustomRoutes