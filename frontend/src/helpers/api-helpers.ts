import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const resp = await axios.post("/user/signin", { email, password });
  if (resp.status === 200) {
    const data = await resp.data;
    return data;
  } else {
    throw new Error("Unable to login");
  }
};

export const checkAuthStatus = async () => {
  const resp = await axios.get("/user/auth-status");
  if (resp.status === 200) {
    return resp.data;
  } else {
    throw new Error("Unable to authenticate.");
  }
};
