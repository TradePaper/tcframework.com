import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostHogProvider } from "./components/PostHogProvider";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostHogProvider>
        <App />
      </PostHogProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
