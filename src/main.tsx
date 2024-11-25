import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId="11731933429-21c5ut2ulla3bnsvstos1uv91jq4j278.apps.googleusercontent.com">
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>

);


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('Service Worker registrado con éxito:', registration);
  }).catch((error) => {
    console.log('Fallo en el registro del Service Worker:', error);
  });
}