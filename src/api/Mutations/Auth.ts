import { LoginInput, SignupInput } from '../schema/User'
import { AxiosClient } from '../../utils/AxiosClient'

export const LoginMutation = async ({ email, password }: LoginInput) => {
  const response = await (await AxiosClient.post('/login', { email, password }))
    .data

  if (response?.token) {
    localStorage.setItem('token', response?.token)
    return response
  }
}

export const SignupMutation = async ({
  email,
  password,
  username,
}: SignupInput) => {
  const response = await (
    await AxiosClient.post('/signup', { email, password, username })
  ).data

  if (response?.token) {
    localStorage.setItem('token', response?.token)
    return response
  }
}
