import { PropsWithChildren, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import { setTokenToHeaders } from "../utils/jwt";

export function TokenProvider(props: PropsWithChildren<{}>) {
  const [token, setToken] = useState(typeof window !== "undefined"
    ? window.localStorage.getItem('token') || '' : '');
  setTokenToHeaders(token);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken: token => {
          setToken(token);
          window.localStorage.setItem('token', token);
        },
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
}