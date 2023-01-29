import { useQuery } from "react-query"
import { Spinner } from "reactstrap"
import { QueryUser } from "../../api/Queries/User"

export const UserDetailScreen = ({ userId }: { userId: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => QueryUser(userId)
  })

  if (isLoading) return <Spinner></Spinner>

  return (
    <>{data?.user?.username}</>
  )
}