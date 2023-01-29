import { AxiosClient } from "../../utils/AxiosClient"
import { UserInput } from "../schema/User"

export const UpdateUserMutation = async ({ userId, input }: {
  userId: number,
  input: UserInput
}) => {
  return await (await AxiosClient.put(`/user/${userId}`, input)).data
}

export const RemoveUserMutation = async (userId: number) => {
  return await (await AxiosClient.delete(`/user/${userId}`)).data
}

export const CreateUserMutation = async (input: UserInput) => {
  return await (await AxiosClient.post(`/signup`, input)).data
}