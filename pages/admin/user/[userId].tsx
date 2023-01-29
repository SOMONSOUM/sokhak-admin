import { useRouter } from "next/router"
import { UserDetailScreen } from "../../../src/screens/User/UserDetailScreen"

const UserDetailPage = () => {
  const router = useRouter()
  const { userId } = router.query
  return <UserDetailScreen userId={Number(userId)} />
}

export default UserDetailPage;