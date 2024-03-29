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

export const signupUser = async (name: string, email: string, password: string) => {
  const resp = await axios.post("/user/signup", { name, email, password });
  if (resp.status === 201) {
    const data = await resp.data;
    return data;
  } else {
    throw new Error("Unable to signup");
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

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status === 200) {
    const data = await res.data;
    return data;
  } else {
    throw new Error("Unable to send chat");
  }
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");

  if (res.status === 200) {
    const data = await res.data;
    return data;
  } else {
    throw new Error("Unable to delete chats");
  }
};

export const sendChatRequest = async (prompt: string) => {
  const res = await axios.post("/chat/new", { prompt });
  if (res.status === 200) {
    const data = await res.data;
    return data;
  } else {
    throw new Error("Unable to send chat");
  }
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");

  if (res.status === 200) {
    const data = await res.data;
    return data;
  } else {
    throw new Error("Unable to logout.");
  }
};
