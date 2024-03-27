import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/shared/CustomInput";

import AIRobotImg from "../../public/airobot.png";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.signinUserFn(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={AIRobotImg} alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form onSubmit={handleLoginSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
