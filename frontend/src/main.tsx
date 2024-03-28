import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";

const theme = createTheme({
  typography: { fontFamily: "Roboto Slab, serif", allVariants: { color: "#fff" } },
});

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL + "/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter basename="/app">
        <ThemeProvider theme={theme}>
          <App />
          <Toaster position="top-right" />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
