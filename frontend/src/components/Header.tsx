import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import CustomLink from "./shared/CustomLink";

const Header = () => {
  const logoutUserFn = useAuth()?.logoutUserFn;
  const isLoggedIn = useAuth()?.isLoggedIn;

  const navItemsLoggedIn = [
    {
      bg: "#00fffc",
      to: "/chat",
      text: "Go To Chat",
      textColor: "black",
    },
    {
      bg: "#51538f",
      textColor: "white",
      to: "/",
      text: "logout",
      onClick: () => logoutUserFn,
    },
  ];

  const navItemsLoggedOut = [
    {
      bg: "#00fffc",
      to: "/login",
      text: "Login",
      textColor: "black",
    },
    {
      bg: "#51538f",
      textColor: "white",
      to: "/signup",
      text: "Signup",
    },
  ];

  const navItems = isLoggedIn ? navItemsLoggedIn : navItemsLoggedOut;

  return (
    <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item, idx) => (
            <CustomLink key={idx} {...item} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
