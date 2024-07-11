import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ClerkProvider } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ClerkProvider>
  </React.StrictMode>
);
