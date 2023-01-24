import React, { useContext } from 'react'
import { Button, Container } from 'reactstrap'
import AuthContext from '../../hooks/AuthContext'

export const DashboardScreen = () => {
  const { me } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  }

  return (
    <Container className='mt-4'>
      <h2>Login as: {me?.fullname}</h2>
      <Button onClick={handleLogout} color="danger">Logout</Button>
    </Container>
  )
}