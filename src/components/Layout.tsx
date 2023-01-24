import React, { PropsWithChildren } from "react"
import { Header } from "./Header/Header"

export const Layout = (props: PropsWithChildren) => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  )
}