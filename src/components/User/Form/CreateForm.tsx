import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { CreateUserMutation } from "../../../api/Mutations/UserMutation"
import Swal from "sweetalert2"

export const CreateUserForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: CreateUserMutation,
    onSuccess(data, variables, context) {
      Swal.fire({
        title: "Success!",
        icon: 'success',
        text: `Created user successfully!`,
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(['users']);
      setEmail('');
      setPassword('');
      setFullname('');
      setUsername('')
    },
    mutationKey: ['create_user'],
  })

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const input = { email, password, fullname, username }

    mutate(input)
  }

  return (
    <Container className="mt-4">
      <Form onSubmit={handleOnSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e?.target?.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e?.target?.value)}
            value={password}
          />
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e?.target?.value)}
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <Label>Fullname</Label>
          <Input
            type="text"
            name="fullname"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e?.target?.value)}
            value={fullname}
          />
        </FormGroup>
        {
          isLoading ? <Button><Spinner size="sm">Loading...</Spinner></Button>
            : <Button color="primary">Save</Button>
        }
      </Form>
    </Container>
  )
}