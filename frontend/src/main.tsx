import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./store/auth.tsx";
import { DocumentProvider } from "./store/document.tsx";
import { ChatProvider } from "./store/chat/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <DocumentProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </DocumentProvider>
    </AuthProvider>
  </StrictMode>
);
