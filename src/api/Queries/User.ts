import { AxiosClient } from '../../utils/AxiosClient'

export const QueryUsers = async () => {
  return await (await AxiosClient.get('/users')).data
}
