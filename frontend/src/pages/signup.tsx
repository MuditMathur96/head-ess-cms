import { AuthLoading, LoggedIn, LoggedOut } from '@/components/protected-route'
import SignUpForm from '@/components/resgister-form'
import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {}

function SignUp({}: Props) {
  return (
    <>
    <AuthLoading>
        <div>Loading...</div>
    </AuthLoading>
    <LoggedIn>
        <Navigate to="/" />
    </LoggedIn>
    <LoggedOut>
        <SignUpForm />
    </LoggedOut>
    </>
  )
}

export default SignUp