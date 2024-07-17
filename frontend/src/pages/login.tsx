import LoginForm from '@/components/login-form'
import { AuthLoading, LoggedIn, LoggedOut } from '@/components/protected-route'
import React from 'react'
import { Navigate } from 'react-router-dom'

function LoginPage() {
  return (
    <>
    <AuthLoading>
        <div>Loading...</div>
    </AuthLoading>
    <LoggedIn>
        <Navigate to="/" />
    </LoggedIn>
    <LoggedOut>
        <LoginForm />
    </LoggedOut>
    </>
    
  )
}

export default LoginPage