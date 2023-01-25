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
import Swal from "sweetalert2";
import { AxiosClient } from "../../api/AxiosClient";

export const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const signup = async ({ email, password, username }: { email: string; password: string, username: string }) => {
    const response = await (await AxiosClient.post('/signup', { email, password, username })).data

    if (response?.token) {
      localStorage.setItem('token', response?.token);
      return response;
    }
  }

  const { mutate } = useMutation("Signup", {
    mutationFn: signup,
    onError: (err: any) => {
      const error = err.response.data
      Swal.fire({
        icon: 'error',
        title: "Failed",
        text: `${error.message}`,
        footer: 'Click to see more',
        confirmButtonText: 'Ok',
      });
    },
    onSuccess: ({ token }) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let input = { email, password, username }
    mutate(input)
  }
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e?.target?.value)}
          />
          <Label for="email">
            Email
          </Label>
        </FormGroup>
        {' '}
        <FormGroup floating>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e?.target?.value)}
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
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <Label for="password">
            Password
          </Label>
        </FormGroup>
        {' '}
        <Button color="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}