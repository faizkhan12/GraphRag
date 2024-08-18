import { createBrowserRouter } from "react-router-dom";
import SignIn from "./page/auth/signin";
import NavBar from "./components/navbar";
import DocumentsPage from "./page/documents";
import DocumentPage from "./page/document-view";
import UploadDocument from "./page/upload-document";
import Signup from "./page/auth/signup";
import Home from "./page/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/documents",
        element: <DocumentsPage />,
      },
      {
        path: "/documents/:id",
        element: <DocumentPage />,
      },
      {
        path: "/upload-document",
        element: <UploadDocument />,
      },
    ],
  },
]);
