import { PropsWithChildren, useContext } from "react";
import { useQuery } from "react-query";
import jwt from 'jsonwebtoken'
import { AxiosClient } from "../config/AxiosClient";
import { TokenContext } from "./TokenContext";
import { LoginScreen } from "../screens/Authentication/LoginScreen";
import AuthContext from "./AuthContext";
import Notiflix from "notiflix";

export default function LoginVerification(props: PropsWithChildren<{}>) {
  const { token } = useContext(TokenContext)
  const decoded: any = jwt.decode(token)

  const { data, isLoading } = useQuery('Me', {
    queryFn: async () => {
      if (token !== "") {
        return await (await AxiosClient.get(`/${decoded?.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'application/json'
          }
        })).data
      }
    },
    onError: error => {
      if (token === '') {
        Notiflix.Notify.failure('Failed');
      } else if (error) {
        Notiflix.Notify.failure('Please contact to you admin');
        localStorage.removeItem('token');
        window.location.reload();
      }
    },
  })

  if (isLoading) return <></>

  if (data === undefined || data === null) {
    return <LoginScreen />;
  }

  if (data && data?.me) {
    return (
      <AuthContext.Provider
        value={{
          me: data?.me
        }}>
        {props.children}
      </AuthContext.Provider>
    )
  }

  return null
}