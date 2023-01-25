import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Button, Container, Spinner } from 'reactstrap'
import { AxiosClient } from '../../api/AxiosClient'
import AuthContext from '../../contexts/AuthContext'

export const DashboardScreen = () => {
  const { me } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  }

  const { data, isLoading } = useQuery('Users', {
    queryFn: async () => {
      return await (await AxiosClient.get('/users')).data
    }
  })

  if (isLoading) return <Spinner>Loading...</Spinner>
  console.log(data?.users);

  return (
    <Container className='mt-4'>
      <h2>Login as: {me?.fullname}</h2>
      <Button onClick={handleLogout} color="danger">Logout</Button>
    </Container>
  )
}