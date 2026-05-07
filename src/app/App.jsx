
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import './App.css'
import { AuthPage } from '../features/auth/pages/AuthPage'
import { AppRoutes } from './router/AppRoutes'
import { toast, Toaster } from 'react-hot-toast';


function App() {

  return( 
    <>
      <Toaster 
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "1rem",
          borderRadius: "8px",
        }
      }}/>
      <AppRoutes />
    </>
  )
}

export default App;