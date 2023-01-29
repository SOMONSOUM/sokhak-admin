import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { Spinner } from "reactstrap"
import { QueryUser } from "../../api/Queries/User"
import { UpdateUserForm } from "../../components/User/Form/UpdateForm"

export const EditUserScreen = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data, isLoading } = useQuery({
    queryKey: ['uderId', userId],
    queryFn: () => QueryUser(Number(userId))
  })

  if (isLoading) return <Spinner>Loading...</Spinner>

  return (
    <UpdateUserForm
      defaultValues={data?.user}
      userId={Number(userId)}
    />
  )
}