import { AxiosClient } from '../../utils/AxiosClient'

export const QueryUsers = async () => {
  return await (await AxiosClient.get('/users')).data
}

export const QueryUser = async (userId:number) => {
  return await (await AxiosClient.get(`/user/${userId}`)).data
}
