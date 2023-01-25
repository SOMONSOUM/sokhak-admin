import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Button, Col, Container, Row, Spinner, Table } from 'reactstrap'
import { FiTrash, FiEye, FiEdit, FiLogOut } from 'react-icons/fi'
import AuthContext from '../../contexts/AuthContext'
import { QueryUsers } from '../../api/Queries/User'

export const DashboardScreen = () => {
  const { me } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  }


  const RenderUserTable = () => {
    const { data, isLoading } = useQuery({
      queryFn: QueryUsers,
      queryKey: 'Users',
    })

    if (isLoading) return <Spinner>Loading...</Spinner>

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th> # </th>
            <th> Fullname </th>
            <th> Email </th>
            <th> Username </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {
            data?.users.map((user: any, idx: number) => {
              return (
                <tr key={idx}>
                  <th scope="row"> {idx + 1} </th>
                  <td> {user?.fullname} </td>
                  <td> {user?.email} </td>
                  <td> {user?.username}</td>
                  <td>
                    <Row>
                      <Col>
                        <Button color='primary'>
                          <FiEye />
                        </Button>
                      </Col>
                      <Col>
                        <Button color='success'>
                          <FiEdit />
                        </Button>
                      </Col>
                      <Col>
                        <Button color='danger'>
                          <FiTrash />
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }

  return (
    <Container className='mt-4'>
      <div className='d-flex mb-3' style={{ justifyContent: "space-between" }}>
        <img src='/Godital-Site-Logo.svg' width={120} />
        <h2>Login as: {me?.fullname}</h2>
        <Button onClick={handleLogout} color="danger"><FiLogOut /> ចេញ</Button>
      </div>
      <RenderUserTable />
    </Container>
  )
}