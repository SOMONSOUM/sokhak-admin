import React, { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Col, Container, Row, Spinner, Table } from 'reactstrap'
import { FiTrash, FiEye, FiEdit, FiLogOut, FiPlusCircle } from 'react-icons/fi'
import AuthContext from '../../contexts/AuthContext'
import { QueryUsers } from '../../api/Queries/User'
import { useRouter } from 'next/router'
import { RemoveUserMutation } from '../../api/Mutations/UserMutation'
import Swal from 'sweetalert2'
import { CreateUserModal } from '../User/CreateUserModal'

export const DashboardScreen = () => {
  const { me } = useContext(AuthContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  }

  const RenderUserTable = () => {
    const { data, isLoading } = useQuery({
      queryFn: QueryUsers,
      queryKey: 'users',
    })

    const { mutate } = useMutation({
      mutationFn: RemoveUserMutation,
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          icon: "success",
          text: "Deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        queryClient.invalidateQueries(['users'])
      },
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
                        <Button
                          onClick={() => router.push(`/admin/user/${user?.id}`)}
                          color='primary'
                        >
                          <FiEye />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          color='success'
                          onClick={() => router.push(`/admin/user/${user?.id}/edit`)}
                        >
                          <FiEdit />
                        </Button>
                      </Col>
                      <Col>
                        <Button color='danger'
                          onClick={() => mutate(user?.id)}
                        >
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
        <Button color="success" onClick={() => setOpen(!open)}>
          <FiPlusCircle /> បន្ថែម
        </Button>
        <Button onClick={handleLogout} color="danger"><FiLogOut /> ចេញ</Button>
      </div>
      <RenderUserTable />
      <CreateUserModal open={open} setOpen={setOpen} />
    </Container>
  )
}