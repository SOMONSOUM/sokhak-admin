import { Navbar, NavbarBrand } from "reactstrap"

export const Header = () => {
  return (
    <>
      <Navbar
        className="my-2"
        color="dark"
        dark
      >
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="/next.svg"
            style={{
              height: 40,
              width: 40
            }}
          />
        </NavbarBrand>
      </Navbar>
    </>
  )
}