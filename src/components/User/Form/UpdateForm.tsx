import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query"
import { Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { UpdateUserMutation } from "../../../api/Mutations/UserMutation"
import Swal from "sweetalert2"
import { UserInput } from "../../../api/schema/User"

export const UpdateUserForm = ({ defaultValues, userId }: {
  defaultValues: UserInput,
  userId: number
}) => {
  const router = useRouter()
  const [email, setEmail] = useState(defaultValues?.email || '')
  const [username, setUsername] = useState(defaultValues?.username || '')
  const [fullname, setFullname] = useState(defaultValues?.fullname || '')

  const { mutate, isLoading } = useMutation({
    mutationFn: UpdateUserMutation,
    onSuccess(data, variables, context) {
      Swal.fire({
        icon: 'success',
        text: `Update user has id=${variables?.userId} successfully!`,
      });
      router.back()
    },
    mutationKey: ['modify_user', userId]
  })

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const input = { email, fullname, username }

    mutate({ userId: userId, input: input })
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