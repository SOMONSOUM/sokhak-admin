import { createContext, useContext } from "react";

export const TokenContext = createContext<{
  token: string;
  setToken: (token: string) => void;
}>({ token: '', setToken: () => { } })

export function useToken() {
  return useContext(TokenContext);
}