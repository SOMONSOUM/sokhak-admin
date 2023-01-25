import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { FiLogIn } from 'react-icons/fi'
import Swal from "sweetalert2";
import { LoginMutation } from "../../api/Mutations/Auth";

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useMutation("login", {
    mutationFn: LoginMutation,
    onError: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: "Failed",
        text: `${err.message}`,
        footer: 'Click to see more',
        confirmButtonText: 'Ok',
      });
    },
    onSuccess: ({ token }: { token: string }) => {
      localStorage.setItem('token', token)

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login to System',
        footer: `Welcome to System!`,
        showConfirmButton: false,
        timer: 2000,
      })
      window.location.replace('/')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let input = { email, password }
    mutate(input)
  }
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e?.target?.value)}
          />
          <Label for="username">
            Username
          </Label>
        </FormGroup>
        {' '}
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e?.target?.value)}
          />
          <Label for="password">
            Password
          </Label>
        </FormGroup>
        {' '}
        <Button color="primary" type="submit">
          <FiLogIn /> ចូល
        </Button>
      </Form>
    </Container>
  )
}